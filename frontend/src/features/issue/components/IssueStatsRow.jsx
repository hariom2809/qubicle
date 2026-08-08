export default function IssueStatsRow({ label, value }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm text-text-muted">
                {label}
            </span>

            <span className="text-sm font-medium text-foreground">
                {value}
            </span>
        </div>
    )
}
