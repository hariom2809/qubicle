export const validateRegisterForm = (email, password, confirmPassword) => {

    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
        errors.email = "Please enter email"
    } else if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email"
    }

    if (!password) {
        errors.password = "Please enter password"
    } else if (password.length < 8) {
        errors.password = "Password must be of 8 characters"
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Please enter password agian"
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Password doesn't match"
    }

    return errors
}