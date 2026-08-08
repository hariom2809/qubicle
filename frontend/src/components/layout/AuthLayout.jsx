export default function AuthLayout({ title, subtitle, children }) {

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-secondary px-4 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Qubicle
                    </h1>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-semibold text-foreground">
                            {title}
                        </h2>

                        {subtitle && (
                            <p className="mt-1.5 text-sm text-text-muted">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}
