import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

export default function AppLayout () {
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <main className="flex-1 overflow-auto px-8 py-8">
                <Outlet />
            </main>
        </div>
    )
}
