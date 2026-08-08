import Modal from "../../../components/ui/Modal"
import ProjectForm from "./ProjectForm"

export default function ProjectCreateModal({isOpen, onClose}) {
    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Project"
        >
            <ProjectForm onClose={onClose} />
        </Modal>
    )
}