import { useEffect, useState } from "react"
import Modal from "../../../components/ui/Modal"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
import { useSearchUsers } from "../hooks/useSearchUsers"
import { useAddMember } from "../hooks/useAddMember"
import { userInitial, userName } from "../../../utils/formatUser"

const ROLES = [
    { label: "Member", value: "member" },
    { label: "Admin", value: "admin" },
    { label: "Viewer", value: "viewer" },
]

const selectClassName = `
    w-full px-4 py-2.5
    rounded-xl border border-border bg-background
    text-sm text-foreground
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
`

export default function AddMemberModal({ isOpen, onClose, projectId }) {

    const [searchText, setSearchText] = useState("")
    const [query, setQuery] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)
    const [role, setRole] = useState("member")

    const userQuery = useSearchUsers(query)
    const addMember = useAddMember()

    const users = userQuery.data || []

    useEffect(() => {
        const timer = setTimeout(() => setQuery(searchText), 350)
        return () => clearTimeout(timer)
    }, [searchText])

    const resetForm = () => {
        setSearchText("")
        setQuery("")
        setSelectedUser(null)
        setRole("member")
        addMember.reset()
    }

    const handleClose = () => {
        resetForm()
        onClose?.()
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!selectedUser) return

        addMember.mutate(
            { projectId, user: selectedUser.id, role },
            { onSuccess: handleClose }
        )
    }

    const errorMessage =
        addMember.error?.response?.data?.message ||
        addMember.error?.response?.data?.detail

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Add Member"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Find a user"
                    value={searchText}
                    onChange={(event) => {
                        setSearchText(event.target.value)
                        setSelectedUser(null)
                    }}
                    placeholder="Search by name or email…"
                />

                {query && (
                    <div className="max-h-56 overflow-y-auto rounded-xl border border-border">
                        {userQuery.isFetching && (
                            <p className="p-3 text-sm text-text-muted">Searching…</p>
                        )}

                        {userQuery.isError && (
                            <p className="p-3 text-sm text-danger">
                                User search is unavailable. Make sure Elasticsearch is running.
                            </p>
                        )}

                        {!userQuery.isFetching && !userQuery.isError && !users.length && (
                            <p className="p-3 text-sm text-text-muted">No users found.</p>
                        )}

                        {users.map((user) => {
                            const isSelected = selectedUser?.id === user.id

                            return (
                                <button
                                    key={user.id}
                                    type="button"
                                    onClick={() => setSelectedUser(user)}
                                    className={`
                                        flex w-full items-center gap-3 px-3 py-2.5 text-left
                                        border-b border-border last:border-0
                                        transition-colors duration-150
                                        ${isSelected ? "bg-primary/10" : "hover:bg-surface-secondary"}`
                                    }
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                        {userInitial(user)}
                                    </span>

                                    <span className="min-w-0">
                                        <span className="block truncate text-sm font-medium text-foreground">
                                            {userName(user, user.email)}
                                        </span>
                                        <span className="block truncate text-xs text-text-muted">
                                            {user.email}
                                        </span>
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">
                        Role
                    </label>
                    <select
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        className={selectClassName}
                    >
                        {ROLES.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {addMember.isError && (
                    <p className="text-sm text-danger">
                        {errorMessage || "Failed to add member. Please try again."}
                    </p>
                )}

                <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                    <p className="truncate text-sm text-text-muted">
                        {selectedUser
                            ? `Adding ${userName(selectedUser, selectedUser.email)}`
                            : "Select a user to add"}
                    </p>

                    <div className="flex shrink-0 gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!selectedUser || addMember.isPending}
                        >
                            {addMember.isPending ? "Adding…" : "Add Member"}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
