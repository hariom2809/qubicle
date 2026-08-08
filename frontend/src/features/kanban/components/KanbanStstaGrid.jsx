import KanbanStatsCard from "./KanbanStatsCard";

export default function KanbanStatsGrid({ issues }) {

    const todoIssues = issues.filter(
        issue => issue.status === "to_do"
    ).length

    const inProgessIssues = issues.filter(
        issue => issue.status === "in_progress"
    ).length

    const inReviewIssues = issues.filter(
        issue => issue.status === "in_review"
    ).length

    const doneIssues = issues.filter(
        issue => issue.status === "done"
    ).length

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KanbanStatsCard title="To Do" value={todoIssues} accent="bg-slate-400" />
            <KanbanStatsCard title="In Progress" value={inProgessIssues} accent="bg-indigo-500" />
            <KanbanStatsCard title="In Review" value={inReviewIssues} accent="bg-amber-500" />
            <KanbanStatsCard title="Done" value={doneIssues} accent="bg-emerald-500" />
        </div>
    )
}
