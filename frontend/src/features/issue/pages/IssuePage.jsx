import { useParams } from "react-router-dom"
import { useGetIssue } from "../hooks/useGetIssue"
import PageContainer from "../../../components/ui/PageContainer"
import IssueDetail from "../components/IssueDetail"
import IssueStats from "../components/IssueStats"
import CommentSection from "../../comment/components/CommentSection"
import ActivityLog from "../../activityLog/components/ActivityLog"

export default function IssuePage() {

    const { issueId } = useParams()
    const issueQuery = useGetIssue(issueId)
    const issue = issueQuery.data

    if (issueQuery.isLoading) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-text-muted">
                Loading issue…
            </div>
        )
    }

    if (issueQuery.isError) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-danger">
                Something went wrong.
            </div>
        )
    }

    return (
        <PageContainer>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <IssueDetail issue={issue} />
                    <CommentSection issueId={issueId} />
                    <ActivityLog issueId={issueId} />
                </div>

                <div className="lg:col-span-1">
                    <IssueStats issue={issue} />
                </div>
            </div>
        </PageContainer>
    )
}
