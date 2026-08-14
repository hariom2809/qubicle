import { useEffect, useState } from "react"
import Button from "../../../components/ui/Button"
import { ISSUE_STATUS } from "../../../constants/issueStatus"
import { ISSUE_PRIORITY } from "../../../constants/issuePriority"

const ISSUE_TYPES = [
    { label: "Bug", value: "bug" },
    { label: "Task", value: "task" },
    { label: "Story", value: "story" },
    { label: "Epic", value: "epic" },
]

const STATUS_OPTIONS = Object.entries(ISSUE_STATUS).map(
    ([value, config]) => ({ value, label: config.label })
)

const PRIORITY_OPTIONS = Object.entries(ISSUE_PRIORITY).map(
    ([value, config]) => ({ value, label: config.label })
).reverse()

const selectClassName = `
    px-3 py-2
    rounded-xl border border-border bg-background
    text-sm text-foreground
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
`

function FilterSelect({ name, value, placeholder, options, onChange }) {
    return (
        <select
            name={name}
            value={value}
            onChange={(event) => onChange(name, event.target.value)}
            className={selectClassName}
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default function KanbanFilterBar({ filters, onChange, isFetching }) {

    const [searchText, setSearchText] = useState(filters.search)

    useEffect(() => {
        if (searchText === filters.search) return

        const timer = setTimeout(() => onChange("search", searchText), 350)
        return () => clearTimeout(timer)
    }, [searchText, filters.search, onChange])

    const handleClear = () => {
        setSearchText("")
        onChange("reset")
    }

    const hasFilters = Boolean(
        filters.search || filters.type || filters.status || filters.priority
    )

    return (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-sm">
            <div className="relative min-w-55 flex-1">
                <input
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search issues by title, number or description…"
                    className="
                        w-full px-4 py-2
                        rounded-xl border border-border bg-background
                        text-sm text-foreground placeholder:text-text-muted
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            </div>

            <FilterSelect
                name="status"
                value={filters.status}
                placeholder="All statuses"
                options={STATUS_OPTIONS}
                onChange={onChange}
            />

            <FilterSelect
                name="type"
                value={filters.type}
                placeholder="All types"
                options={ISSUE_TYPES}
                onChange={onChange}
            />

            <FilterSelect
                name="priority"
                value={filters.priority}
                placeholder="All priorities"
                options={PRIORITY_OPTIONS}
                onChange={onChange}
            />

            {hasFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                >
                    Clear
                </Button>
            )}

            {isFetching && (
                <span className="text-xs text-text-muted">Filtering…</span>
            )}
        </div>
    )
}
