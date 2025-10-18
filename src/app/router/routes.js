import { userRoutes } from "../../features/user/routes";
import Body from "../../layouts/Body";

export const appRoutes = [
    {
        path: "/",
        element: <Body />,
        children: [
            ...userRoutes
        ]
    }
]