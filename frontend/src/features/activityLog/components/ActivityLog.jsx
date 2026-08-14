import { useListActivityLog } from "../hooks/useListActivityLog"
import Card from "../../../components/ui/Card"
import ActivityLogRow from "./ActivityLogRow"

const VISIBLE_ACTIVITIES = 5

export default function ActivityLog({ issueId }) {

    const activityLogQuery = useListActivityLog(issueId)

    const activities = activityLogQuery.data?.results || []
    const totalActivities = activityLogQuery.data?.count ?? activities.length
    const isScrollable = activities.length > VISIBLE_ACTIVITIES

    return (
        <Card className="space-y-4">
            <div className="flex items-baseline justify-between">
                <h2 className="text-base font-semibold text-foreground">
                    Activity
                    {!activityLogQuery.isLoading && (
                        <span className="ml-2 text-sm font-normal text-text-muted">
                            {totalActivities}
                        </span>
                    )}
                </h2>

                {isScrollable && (
                    <small className="text-xs text-text-muted">
                        Showing latest {VISIBLE_ACTIVITIES} — scroll for older
                    </small>
                )}
            </div>

            {activityLogQuery.isLoading && (
                <p className="text-sm text-text-muted">Loading activity…</p>
            )}

            {activityLogQuery.isError && (
                <p className="text-sm text-danger">Could not load activity.</p>
            )}

            {!activityLogQuery.isLoading && !activities.length && (
                <p className="text-sm text-text-muted">No activity recorded yet.</p>
            )}

            <div
                className={`space-y-1 ${
                    isScrollable ? "max-h-96 overflow-y-auto pr-1" : ""
                }`}
            >
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
