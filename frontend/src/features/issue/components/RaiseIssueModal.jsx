import Modal from "../../../components/ui/Modal"
import IssueForm from "./IssueForm"

export default function RaiseIssueModal({ isOpen, onClose, projectId }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Raise Issue"
        >
            <IssueForm projectId={projectId} onClose={onClose} />
        </Modal>
    )
}
