export default function ProjectDetail({ project }) {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Project
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                    {project.name}
                </h2>

                <span className="mt-4 inline-block rounded-md bg-surface-secondary px-3 py-1 text-sm font-medium uppercase tracking-wide text-text-muted ring-1 ring-inset ring-border">
                    {project.key}
                </span>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm lg:col-span-2">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
                    Description
                </h3>

                <div className="max-h-48 overflow-y-auto">
                    <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                        {project.description || "No description provided."}
                    </p>
                </div>
            </div>
        </div>
    )
}
