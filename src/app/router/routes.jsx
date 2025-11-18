import { webPages } from "../../utils/WebPages";
import { ProtectedRoute } from "./ProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout"
import { Route, Routes } from "react-router";
import LoginPage from "../../features/auth/pages/LoginPage";

export const AppRoutes = () => (
  <Routes>

    {/* Public root layout */}
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<LoginPage />} />

      {/* Protected dashboard layout */}
      <Route element={<DashboardLayout />}>

        {/* Auto-generated protected routes from webPages */}
        {webPages.map((page) => (
          <Route
            key={page.sidebar.route}
            element={
              <ProtectedRoute
                resource={page.key}
                action={page.action}
              />
            }
          >
            <Route
              path={page.sidebar.route}
              element={page.sidebar.component}
            />
          </Route>
        ))}

        {/* Children routes also handled */}
        {webPages.flatMap((page) =>
          page.children?.map((child) => (
            <Route
              key={child.sidebar.route}
              element={
                <ProtectedRoute
                  resource={child.key}
                  action={child.action}
                />
              }
            >
              <Route
                path={child.sidebar.route}
                element={child.sidebar.component}
              />
            </Route>
          ))
        )}
      </Route>
    </Route>

  </Routes>
);