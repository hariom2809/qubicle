import Input from "../../../components/ui/Input"

const ISSUE_TYPES = [
    { label: "Bug", value: "bug" },
    { label: "Task", value: "task" },
    { label: "Story", value: "story" },
    { label: "Epic", value: "epic" },
]

const iSSUE_STATUS = [
    {label: "To Do" , value: "to_do" },
    {label: "In Progress" , value: "in_progress" },
    {label: "In Review" , value: "in_review" },
    {label: "Done" , value: "done" },
]

const ISSUE_PRIORITY = [
    {label: "Highest" , value: "highest" },
    {label: "High" , value: "high" },
    {label: "Medium" , value: "medium" },
    {label: "Low" , value: "low" },
    {label: "Lowest", value: "lowest" },
]

const selectClassName = `
    w-full px-4 py-2.5
    rounded-xl border border-border bg-background
    text-sm text-foreground
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
`

export default function IssueFormFields({ formData, handleChange }) {

    return (
        <>
            <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g Login button not working"
                required
            />

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue…"
                    className="
                        w-full min-h-[120px] px-4 py-2.5
                        rounded-xl border border-border bg-background
                        text-sm text-foreground placeholder:text-text-muted
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">
                        Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className={selectClassName}
                    >
                        <option value="" disabled>Select type</option>
                        {ISSUE_TYPES.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className={selectClassName}
                    >
                        <option value="" disabled>Select status</option>
                        {iSSUE_STATUS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">
                        Priority
                    </label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        required
                        className={selectClassName}
                    >
                        <option value="" disabled>Select priority</option>
                        {ISSUE_PRIORITY.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}                    
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">
                        Assignee
                    </label>
                    <select
                        name="assignee"
                        value={formData.assignee}
                        onChange={handleChange}
                        disabled
                        className={`${selectClassName} opacity-60 cursor-not-allowed`}
                    >
                        <option value="">Assign later</option>
                        {/* TODO: populate with project members */}
                    </select>
                </div>

                <Input
                    label="Due date"
                    type="datetime-local"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}
