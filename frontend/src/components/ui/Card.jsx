export default function Card ({ children, onClick, className = "" }) {
    return (
        <div
            onClick={onClick}
            className={`bg-surface border border-border rounded-xl p-5 shadow-sm ${className}`}
        >
            {children}
        </div>
    )
}
