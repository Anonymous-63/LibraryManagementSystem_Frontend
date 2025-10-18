import { Outlet } from "react-router";
import Header from "./Header";

export default function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
}