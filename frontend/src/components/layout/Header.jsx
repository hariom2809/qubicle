export default function Header ({ title, subtitle, actions }) {
    return (
        <header className="flex items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="min-w-0">
                <h1 className="text-2xl font-bold tracking-tight text-foreground truncate">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 text-sm text-text-muted">
                        {subtitle}
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex shrink-0 items-center gap-3">
                    {actions}
                </div>
            )}
        </header>
    )
}
