import { formatDateTime } from "../../../utils/formatDate"
import { userName } from "../../../utils/formatUser"
import { formatStatus } from "../../../utils/formatStatus"
import { formatPriority } from "../../../utils/formatPriority"

const FIELD_LABELS = {
    status: "Status",
    priority: "Priority",
    assignee: "Assignee",
    due_date: "Due date",
}

const formatValue = (field, value) => {
    if (!value) return field === "assignee" ? "Unassigned" : "None"

    if (field === "status") return formatStatus(value)
    if (field === "priority") return formatPriority(value)

    return value
}

export default function ActivityLogRow({ activityLog }) {

    const field = activityLog.field
    const label = FIELD_LABELS[field] || formatStatus(field)

    return (
        <div className="flex items-start gap-3 border-b border-border py-3 last:border-0">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 text-sm">
                    <span className="font-medium text-foreground">
                        {userName(activityLog.actor, "Someone")}
                    </span>
                    <span className="text-text-muted">changed</span>
                    <span className="font-medium text-foreground">{label}</span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-md bg-surface-secondary px-2 py-0.5 text-xs font-medium text-text-muted line-through">
                        {formatValue(field, activityLog.old_value)}
                    </span>
                    <span className="text-text-muted">→</span>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {formatValue(field, activityLog.new_value)}
                    </span>
                </div>
            </div>

            <small className="shrink-0 text-xs text-text-muted">
                {formatDateTime(activityLog.created_at)}
            </small>
        </div>
    )
}
