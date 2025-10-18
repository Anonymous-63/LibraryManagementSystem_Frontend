import UserDetails from "./pages/UserDetails";
import UserPage from "./pages/UserPage";

export const userRoutes = [
    {
        path: "users",
        element: <UserPage />,
        roles: ["ADMIN", "MANAGER"],
        children: [
            { path: ":id", element: <UserDetails /> },
        ],
    },
]