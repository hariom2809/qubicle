export const formatStatus = (status) => {
    if (!status) return "N/A"

    return status.split("_").map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(" ")
}