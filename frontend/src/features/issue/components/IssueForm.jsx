import { useCreateIssue } from "../hooks/useCreateIssue"
import { useIssueForm } from "../hooks/useIssueForm"
import Button from "../../../components/ui/Button"
import IssueFormFields from "./IssueFormFields"

export default function IssueForm({ projectId, onClose }) {

    const createIssue = useCreateIssue()
    const { formData, handleChange, resetForm } = useIssueForm()

    const handleSubmit = (event) => {
        event.preventDefault()

        const issueData = {
            title: formData.title,
            description: formData.description,
            type: formData.type,
            status: formData.status,
            priority: formData.priority,
            due_date: formData.due_date
                ? new Date(formData.due_date).toISOString()
                : null,
            // assignee intentionally omitted — feature to be added later
        }

        createIssue.mutate(
            { projectid: projectId, issueData },
            {
                onSuccess: () => {
                    resetForm()
                    onClose?.()
                },
            }
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <IssueFormFields
                formData={formData}
                handleChange={handleChange}
            />

            {createIssue.isError && (
                <p className="text-sm text-danger">
                    Failed to raise issue. Please try again.
                </p>
            )}

            <div className="flex justify-end gap-3 border-t border-border pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={createIssue.isPending}
                >
                    {createIssue.isPending ? "Raising..." : "Raise Issue"}
                </Button>
            </div>
        </form>
    )
}
