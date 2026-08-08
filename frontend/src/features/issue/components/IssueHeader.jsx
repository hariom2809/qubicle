export default function IssueHeader({ title, description }) {

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
            </h1>

            <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
                    Description
                </h3>
                <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                    {description || "No description provided."}
                </p>
            </div>
        </div>
    )
}
