import ProjectCard from "./ProjectCard"

export default function ProjectGrid ({ projects, onProjectClick }) {

    if (!projects.length) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface py-16 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-secondary text-xl">
                    ▦
                </div>
                <p className="text-sm font-medium text-foreground">No projects yet</p>
                <p className="mt-1 text-sm text-text-muted">
                    Create your first project to get started.
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => onProjectClick(project.id)}
                />
            ))}
        </div>
    )
}
