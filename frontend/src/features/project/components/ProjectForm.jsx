import { useProjectForm } from "../hooks/useProjectForm"
import { useCreateProject } from "../hooks/useCreateProject"
import Button from "../../../components/ui/Button"
import ProjectFormFields from "./ProjectFormFields"

const ProjectForm = ({ onClose }) => {

  const createProject = useCreateProject()
  const { formData, handleChange } = useProjectForm()


  const handleSubmit = (event) => {
    event.preventDefault()

    createProject.mutate(formData, {
      onSuccess: () => {
        onClose?.()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ProjectFormFields 
        formData={formData}
        handleChange={handleChange}
      />
      
      {createProject.isError && (
        <p className="text-sm text-danger">
          Failed to create project. Please try again.
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
          disabled={createProject.isPending}
        >
          {createProject.isPending ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm