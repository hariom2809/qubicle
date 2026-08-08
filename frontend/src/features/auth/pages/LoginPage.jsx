import AuthLayout from "../../../components/layout/AuthLayout"
import LoginForm from "../components/LoginForm"
import { Link } from "react-router-dom"

export default function LoginPage () {

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Log in"
    >
      <LoginForm />
      <p className="text-center text-sm text-foreground mt-6">
        Don't have an account:
        <Link to="/register" className="ml-1 text-primary transition-colors- hover:text-primary-hover">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}