import { Outlet } from "react-router";
import Header from "../../components/shared/Header";

export default function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-base-300">
            <Header />
            <main className="flex flex-1 items-center justify-center p-4">
                <Outlet />
            </main>
        </div>
    );
}