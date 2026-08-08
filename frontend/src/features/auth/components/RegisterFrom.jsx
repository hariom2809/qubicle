import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { validateRegisterForm } from "../utils/ValidateRegisterForm"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import { useAuth } from "../hooks/useAuth"

export default function RegisterForm () {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const { register } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const validationErrors = validateRegisterForm(email, password, confirmPassword)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setLoading(true)

        try {
            await register(email, password)
            navigate("/login")
        } catch (error) {
            setErrors({api: "Registeration failed, Please try again"})
        } finally{
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="demo@email.com"
            />

            <Input 
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder="Password"
            />

            <Input 
                label="Confrim Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                placeholder="Confirm Password"
            />
            {errors.api && <p className="text-sm text-danger">{errors.api}</p>}

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading ? "Registering ..." : "Register"}
            </Button>
        </form>
    )
}