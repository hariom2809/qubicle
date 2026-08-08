import { useListActivityLog } from "../hooks/useListActivityLog"
import Card from "../../../components/ui/Card"
import ActivityLogRow from "./ActivityLogRow"

export default function ActivityLog({ issueId }) {

    const activityLogQuery = useListActivityLog(issueId)

    const activities = activityLogQuery.data?.results || []

    return (
        <Card className="space-y-4">
            <h2 className="text-base font-semibold text-foreground">
                Activity
            </h2>

            {activityLogQuery.isLoading && (
                <p className="text-sm text-text-muted">Loading activity…</p>
            )}

            {activityLogQuery.isError && (
                <p className="text-sm text-danger">Could not load activity.</p>
            )}

            {!activityLogQuery.isLoading && !activities.length && (
                <p className="text-sm text-text-muted">No activity recorded yet.</p>
            )}

            <div className="space-y-1">
                {activities.map((activity) => (
                    <ActivityLogRow
                        key={activity.id}
                        activityLog={activity}
                    />
                ))}
            </div>
        </Card>
    )
}
