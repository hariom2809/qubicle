import Card from "../../../components/ui/Card"

export default function ProjectCard({ project, onClick }) {
    return (
        <Card
            onClick={onClick}
            className="group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold uppercase text-primary">
                    {project.key?.slice(0, 2) || project.name?.slice(0, 2)}
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                        {project.name}
                    </h2>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                        {project.key}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm text-text-muted">
                <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden>👥</span>
                    {project.member_count} {project.member_count === 1 ? "member" : "members"}
                </span>
                <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open →
                </span>
            </div>
        </Card>
    )
}
