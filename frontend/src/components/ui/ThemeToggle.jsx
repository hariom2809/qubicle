import { useTheme } from "../../context/ThemeContext"

export default function Themetoggle () {
    const {theme, toggleTheme} = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="rounded-lg border border-border bg-surface  px-4 py-2"
        >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
    )
}