import AuthLayout from "../../../components/layout/AuthLayout"
import { Link } from "react-router-dom"
import RegisterForm from "../components/RegisterFrom"

function RegisterPage() {
  return (
    <AuthLayout 
      title="Create a new account"
      subtitle="Sign up"
    >
        <RegisterForm />
        <p className="text-center text-sm text-foreground mt-6">
            Already have an account
            <Link to="/login" className="ml-1 text-primary hover:text-primary-hover">
                Log in
            </Link>
        </p>
    </AuthLayout>
  )
}

export default RegisterPage
