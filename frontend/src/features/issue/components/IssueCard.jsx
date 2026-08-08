import { useDraggable } from "@dnd-kit/react"
import Card from "../../../components/ui/Card"
import PriorityBadge from "../../../components/ui/PriorityBadge"

export default function IssueCard ({ issue, onClick }) {

    const { ref } = useDraggable({
        id: issue.id,
        data: {
            issueId: issue.id,
            status: issue
        }
    })

    return (
        <Card
            onClick={onClick}
            className="cursor-grab p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md active:cursor-grabbing"
        >
            <div ref={ref} className="space-y-3">
                <h4 className="text-sm font-medium leading-snug text-foreground">
                    {issue.title}
                </h4>

                <div className="flex items-center justify-between">
                    <PriorityBadge priority={issue.priority} />

                    <span className="text-xs font-medium text-text-muted">
                        #{issue.number}
                    </span>
                </div>
            </div>
        </Card>
    )
}
