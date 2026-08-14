export const userName = (user, fallback = "Unassigned") => {
    if (!user) return fallback

    if (typeof user === "string") return user

    const fullName = [user.first_name, user.last_name]
        .filter(Boolean)
        .join(" ")
        .trim()

    return fullName || user.name?.trim() || user.email || fallback
}

export const userInitial = (user) => {
    const label = userName(user, "?")
    return label.charAt(0).toUpperCase() || "?"
}
