import Card from "../../../components/ui/Card"

export default function KanbanStatsCard({ title, value, accent = "bg-slate-400" }) {
    return (
        <Card className="transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${accent}`} />
                <span className="text-sm font-medium text-text-muted">
                    {title}
                </span>
            </div>

            <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                {value}
            </p>
        </Card>
    )
}
