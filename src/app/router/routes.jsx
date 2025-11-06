import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ReportsPage from "../../features/dashboard/pages/ReportsPage";
import UsersListPage from "../../features/user/pages/UsersListPage";
import UserDetailPage from "../../features/user/pages/UserDetailPage";
import { ROLES } from "../../utils/constants";

export const AppRoutes = () => (
    <Routes>
        {/* Root routes */}
        <Route path="/" element={<RootLayout />}>
            <Route index element={<DashboardPage />} />

            {/* Auth routes */}
            <Route element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
            </Route>

            {/* Protected dashboard routes */}
            <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
                <Route element={<DashboardLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="users" element={<UsersListPage />} />
                    <Route path="users/:id" element={<UserDetailPage />} />
                </Route>
            </Route>

            {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
    </Routes>
)