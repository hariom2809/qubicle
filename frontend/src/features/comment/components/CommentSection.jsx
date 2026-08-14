import { useListComments } from "../hooks/useListComments"
import Card from "../../../components/ui/Card"
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"

const VISIBLE_COMMENTS = 5

export default function CommentSection({ issueId }) {

    const commentQuery = useListComments(issueId)

    const comments = commentQuery.data?.results || []
    const totalComments = commentQuery.data?.count ?? comments.length
    const isScrollable = comments.length > VISIBLE_COMMENTS

    return (
        <Card className="space-y-5">
            <div className="flex items-baseline justify-between">
                <h2 className="text-base font-semibold text-foreground">
                    Comments
                    {!commentQuery.isLoading && (
                        <span className="ml-2 text-sm font-normal text-text-muted">
                            {totalComments}
                        </span>
                    )}
                </h2>

                {isScrollable && (
                    <small className="text-xs text-text-muted">
                        Showing latest {VISIBLE_COMMENTS} — scroll for older
                    </small>
                )}
            </div>

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

            <div
                className={`space-y-3 ${
                    isScrollable ? "max-h-120 overflow-y-auto pr-1" : ""
                }`}
            >
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </Card>
    )
}
