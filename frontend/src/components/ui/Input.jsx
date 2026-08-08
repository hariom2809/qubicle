export default function Input ({label, error, className = "", ...props}) {
    
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm text-foreground font-medium">
                    {label}
                </label>
            )}

            <input
                className={`
                    w-full
                    px-4
                    py-2.5
                    bg-background
                    border
                    rounded-xl
                    text-sm
                    text-foreground
                    placeholder:text-text-muted
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    focus:border-primary
                    transition-all
                    duration-200
                    ${error ? "border-danger" : "border-border" }
                    ${className}`
                }
                {...props}
            />

            {error && (
                <p className="text-sm text-danger">
                    {error}
                </p>
            )}
        </div>
    )
}