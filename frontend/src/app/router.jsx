import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout"
import ProtectedRoute from "../routes/ProtectedRoute"
import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import Dashboard from "../features/project/pages/Dashboard"
import ProjectBoard from "../features/project/pages/ProjectBoard"
import IssuePage from "../features/issue/pages/IssuePage"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/project/:projectId/",
                element: <ProjectBoard />
            },
            {
                path: "/project/:projectId/issue/:issueId",
                element: <IssuePage />,
            }
        ]
    },
])