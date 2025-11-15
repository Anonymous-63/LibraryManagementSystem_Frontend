import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import RolePage from "../../features/role/page/RolePage"
import { ACTION, RESOURCE_TYPE, ROLES } from "../../utils/constants";
import PoliciesPage from "../../features/policy/page/PoliciesPage";
import LoginPage from "../../features/auth/pages/LoginPage";

export const AppRoutes = () => (
    <Routes>
        {/* Root routes */}
        <Route path="/" element={<RootLayout />}>
            <Route path="/login" element={<LoginPage />} />
            // Role-based route
            <Route element={<ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.DB_ADMIN, ROLES.ALL_LOC_ADMIN, ROLES.LOC_ADMIN, ROLES.OPERATOR]} />}>
                <Route element={<DashboardLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                </Route>
            </Route>

            {/* ABAC-based route */}
            <Route
                element={
                    <ProtectedRoute
                        abac={{ resource: RESOURCE_TYPE.MANAGE_ROLE, action: ACTION.VIEW }}
                    />
                }
            >
                <Route element={<DashboardLayout />}>
                    <Route path="roles" element={<RolePage />} />
                </Route>
            </Route>

            {/* Combined role + ABAC */}
            <Route
                element={
                    <ProtectedRoute
                        roles={[ROLES.SUPER_ADMIN, ROLES.DB_ADMIN]}
                        abac={{ resource: RESOURCE_TYPE.MANAGE_POLICY, action: ACTION.VIEW }}
                    />
                }
            >
                <Route element={<DashboardLayout />}>
                    <Route path="policies" element={<PoliciesPage />} />
                </Route>
            </Route>
        </Route>
    </Routes>
)