import { useParams } from "react-router-dom"
import { useGetProject } from "../hooks/useGetProject"
import Button from "../../../components/ui/Button"
import PageContainer from "../../../components/ui/PageContainer"
import Header from "../../../components/layout/Header"
import ProjectDetail from "../components/ProjectDetail"
import KanbanStatsGrid from "../../kanban/components/KanbanStstaGrid"
import KanbanBoard from "../../kanban/pages/KanbanBoard"
import { useListIssues  } from "../../issue/hooks/useListIssues"
import { useState } from "react"
import AddMemberModal from "../components/AddMemberModal"
import RaiseIssueModal from "../../issue/components/RaiseIssueModal"

export default function ProjectBoard() {

    const { projectId } = useParams()
    const projectQuery = useGetProject(projectId)
    const issueQuery = useListIssues(projectId)

    const [showRaiseIssue, setShowRaiseIssue] = useState(false)
    const [showAddMember, setShowAddMember] = useState(false)

    if (projectQuery.isLoading) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-text-muted">
                Loading project…
            </div>
        )
    }
    if (projectQuery.isError) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-danger">
                Something went wrong.
            </div>
        )
    }

    return (
        <PageContainer>
            <Header 
                title="Projects"
                actions= {
                <>
                    <Button
                        onClick={() => setShowAddMember(true)}
                    >
                        + Add members
                    </Button>

                    <Button
                        onClick={() => setShowRaiseIssue(true)}
                    >
                        + Raise Issue
                    </Button>
                </>}
            />

            <AddMemberModal
                isOpen={showAddMember}
                onClose={() => setShowAddMember(false)}
            />

            <RaiseIssueModal
                isOpen={showRaiseIssue}
                onClose={() => setShowRaiseIssue(false)}
                projectId={projectId}
            />

            <ProjectDetail 
                project={projectQuery.data}
            />

            <KanbanStatsGrid 
                issues={issueQuery.data?.results || []}
            />

            <KanbanBoard 
                projectId={projectId}
                issues={issueQuery.data?.results || []}
            />
        </PageContainer>
    )
}