import { useEffect, useState } from "react"
import { DragDropProvider } from "@dnd-kit/react";
import IssueCard from "../../issue/components/IssueCard"
import KanbanColumn from "../components/KanbanColumn"
import { kanbanColumns } from "../utils/columns"
import { useUpdateIssue } from "../../issue/hooks/useUpdateIssue"
import { useNavigate } from "react-router-dom";

export default function KambanBoard ({projectId, issues}) {

    const navigate = useNavigate()

    const updateIssue = useUpdateIssue()

    const [boardIssues, setBoardIssues] = useState([])

    useEffect(() => (
        setBoardIssues(issues)
    ), [issues])

    const getColumnIssues = (columnId) => {
        return boardIssues.filter( issue => issue.status === columnId )
    }

    const handleDragEnd = (event) => {
        const { source, target } = event.operation

        if (!target) return

        const issueId = source.id
        const newStatus = target.id

        setBoardIssues((prevIssues) =>
            prevIssues.map((issue) =>
                issue.id === issueId ? {...issue, status: newStatus} : issue
    ))

    updateIssue.mutate({
        issueId,
        issueData: {
            status: newStatus,
        }
    })

    }

    return(
        <DragDropProvider onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {kanbanColumns.map((column) => (
                    <KanbanColumn
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    count={getColumnIssues(column.id).length}
                    >
                        {getColumnIssues(column.id).map((issue) => (
                            <IssueCard
                            key={issue.id}
                            issue={issue}
                            onClick={() => navigate(`/project/${projectId}/issue/${issue.id}`)}
                            />
                        ))}
                    </KanbanColumn>
                ))}
            </div>
        </DragDropProvider>
    )
}