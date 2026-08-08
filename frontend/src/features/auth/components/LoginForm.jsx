import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

const LoginForm = () => {
  
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
      navigate("/")
    } catch (error) {
      setError("Login Failed")
    } finally {
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
          placeholder="demo@email.com"
      />

      <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="demo@1234"
      />

      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}

export default LoginForm