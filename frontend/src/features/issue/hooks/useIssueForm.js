import { useState } from "react"

const INITIAL_FORM = {
    title: "",
    description: "",
    type: "",
    status: "",
    priority: "",
    assignee: "",
    due_date: "",
}

export const useIssueForm = () => {

    const [formData, setFormData] = useState(INITIAL_FORM)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => setFormData(INITIAL_FORM)

    return { formData, handleChange, resetForm }
}
