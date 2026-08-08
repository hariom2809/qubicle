import { formatDate } from "../../../utils/formatDate"

export default function ActivityLogRow({ activityLog }) {
    return (
        <div className="flex items-center gap-3 border-b border-border py-3 last:border-0">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />

            <div className="flex flex-1 flex-wrap items-center gap-2 text-sm">
                <span className="rounded-md bg-surface-secondary px-2 py-0.5 text-xs font-medium text-text-muted line-through">
                    {activityLog.old_value}
                </span>
                <span className="text-text-muted">→</span>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {activityLog.new_value}
                </span>
            </div>

            <small className="shrink-0 text-xs text-text-muted">
                {formatDate(activityLog.created_at)}
            </small>
        </div>
    )
}
