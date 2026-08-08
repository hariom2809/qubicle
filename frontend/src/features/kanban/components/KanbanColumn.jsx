import { useDroppable } from "@dnd-kit/react"

export default function KanbanColumn ({ id, title, count = 0, children }) {

    const { ref } = useDroppable({
        id,
        data: {
            columnId: id,
        }
    })

    return (
        <div
            ref={ref}
            className="flex min-h-[600px] flex-col rounded-xl border border-border bg-surface-secondary p-3"
        >
            <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                    {title}
                </h3>
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-surface px-1.5 text-xs font-semibold text-text-muted ring-1 ring-inset ring-border">
                    {count}
                </span>
            </div>

            <div className="flex-1 space-y-3">
                {children}
            </div>
        </div>
    )
}
