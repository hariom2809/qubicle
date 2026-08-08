import { useListComments } from "../hooks/useListComments"
import Card from "../../../components/ui/Card"
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"

export default function CommentSection({ issueId }) {

    const commentQuery = useListComments(issueId)

    const comments = commentQuery.data?.results || []

    return (
        <Card className="space-y-5">
            <h2 className="text-base font-semibold text-foreground">
                Comments
                {!commentQuery.isLoading && (
                    <span className="ml-2 text-sm font-normal text-text-muted">
                        {comments.length}
                    </span>
                )}
            </h2>

            <CommentForm issueId={issueId} />

            {commentQuery.isLoading && (
                <p className="text-sm text-text-muted">Loading comments…</p>
            )}

            {commentQuery.isError && (
                <p className="text-sm text-danger">Could not load comments.</p>
            )}

            {!commentQuery.isLoading && !comments.length && (
                <p className="text-sm text-text-muted">
                    No comments yet. Be the first to add one.
                </p>
            )}

            <div className="space-y-3">
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </Card>
    )
}
