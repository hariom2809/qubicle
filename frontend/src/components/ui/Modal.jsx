const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} rounded-2xl border border-border bg-surface shadow-lg`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl font-semibold text-foreground">
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors duration-150 hover:bg-surface-secondary hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
