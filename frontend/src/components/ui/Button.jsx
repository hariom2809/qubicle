const VARIANTS = {
  primary:
    "bg-primary text-white border-transparent shadow-sm hover:bg-primary-hover",
  secondary:
    "bg-surface text-foreground border-border hover:bg-surface-secondary",
  ghost:
    "bg-transparent text-text-muted border-transparent hover:bg-surface-secondary hover:text-foreground",
  danger:
    "bg-danger text-white border-transparent shadow-sm hover:brightness-110",
}

const SIZES = {
  sm: "py-1.5 px-3 text-sm gap-1.5",
  md: "py-2.5 px-4 text-sm gap-2",
  lg: "py-3 px-5 text-base gap-2",
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-xl border
        cursor-pointer select-none
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button
