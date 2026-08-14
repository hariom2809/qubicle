import { formatDateTime } from "../../../utils/formatDate"
import { userInitial, userName } from "../../../utils/formatUser"

export default function CommentCard({ comment }) {

    const author = comment.author
    const isEdited = comment.updated_at && comment.updated_at !== comment.created_at

    return (
        <div className="flex gap-3 rounded-xl border border-border bg-background p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {userInitial(author)}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <p className="text-sm font-semibold text-foreground">
                        {userName(author, "Unknown user")}
                    </p>

                    <small className="text-xs text-text-muted">
                        {formatDateTime(comment.created_at)}
                        {isEdited && " · edited"}
                    </small>
                </div>

                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {comment.body}
                </p>
            </div>
        </div>
    )
}
