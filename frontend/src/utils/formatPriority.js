export const formatPriority = (priority) => {
    if (!priority) return "N/A"

    return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()
}