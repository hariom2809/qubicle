import { useContext } from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import Themetoggle from "../ui/ThemeToggle"

const navItems = [
    { to: "/", label: "Projects", icon: "▦", end: true },
]

export default function Sidebar () {

    const { logout } = useContext(AuthContext)

    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface">
            <div className="flex h-16 items-center gap-2.5 px-6 border-b border-border">
                <span className="text-lg font-semibold tracking-tight text-foreground">
                    Qubicle
                </span>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-5">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Workspace
                </p>

                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-text-muted hover:bg-surface-secondary hover:text-foreground"
                            }`
                        }
                    >
                        <span className="text-base leading-none">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-border p-3">
                <Themetoggle />
                <button
                    onClick={() => logout()}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors duration-150 hover:bg-danger/10 hover:text-danger"
                >
                    <span className="text-base leading-none">⏻</span>
                    Log out
                </button>
            </div>
        </aside>
    )
}
