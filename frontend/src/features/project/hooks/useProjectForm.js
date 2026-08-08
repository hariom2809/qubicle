import { useState } from "react"

export const useProjectForm = () => {
    
    const [formData, setFormData] = useState({
        name: "",
        key: "",
        description: "",
    })

    const handleChange = (event) => {
        const { name, value} = event.target

        setFormData((prev) => ({...prev, [name]:value,}))
    }

    return {formData, handleChange}
}