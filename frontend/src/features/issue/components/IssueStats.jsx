import IssueStatsRow from "./IssueStatsRow"
import Card from "../../../components/ui/Card"
import { formatDate, formatDateTime } from "../../../utils/formatDate"
import { userName } from "../../../utils/formatUser"
import { formatStatus } from "../../../utils/formatStatus"
import StatusBadge from "../../../components/ui/StatusBadge"
import PriorityBadge from "../../../components/ui/PriorityBadge"

function Section({ title, children }) {
    return (
        <div>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {title}
            </h3>
            <div>{children}</div>
        </div>
    )
}

export default function IssueStats({ issue }) {

    return (
        <Card className="sticky top-0 flex flex-col gap-6">
            <Section title="Details">
                <IssueStatsRow
                    label="Status"
                    value={<StatusBadge status={issue.status} />}
                />
                <IssueStatsRow
                    label="Priority"
                    value={<PriorityBadge priority={issue.priority} />}
                />
                <IssueStatsRow
                    label="Type"
                    value={formatStatus(issue.type)}
                />
                <IssueStatsRow
                    label="Issue"
                    value={issue.number || "—"}
                />
            </Section>

            <Section title="Dates">
                <IssueStatsRow
                    label="Raised on"
                    value={formatDate(issue.created_at)}
                />
                <IssueStatsRow
                    label="Last update"
                    value={formatDateTime(issue.updated_at)}
                />
                <IssueStatsRow
                    label="Due date"
                    value={issue.due_date ? formatDateTime(issue.due_date) : "Not set"}
                />
            </Section>

            <Section title="People">
                <IssueStatsRow
                    label="Reporter"
                    value={userName(issue.reporter, "Unknown user")}
                />
                <IssueStatsRow
                    label="Assigned to"
                    value={userName(issue.assignee, "Unassigned")}
                />
            </Section>
        </Card>
    )
}
