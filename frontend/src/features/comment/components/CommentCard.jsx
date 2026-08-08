export default function CommentCard({ comment }) {

    const initial = comment.author?.[0]?.toUpperCase() || "?"

    return (
        <div className="flex gap-3 rounded-xl border border-border bg-background p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {initial}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                    {comment.author}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {comment.body}
                </p>
            </div>
        </div>
    )
}
