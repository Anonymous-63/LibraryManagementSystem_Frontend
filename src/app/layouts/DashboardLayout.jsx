import { Outlet } from "react-router";

export default function DashboardLayout() {
    return (
        <div className="flex">
            {/* <Sidebar /> */}
            <div className="flex-1 p-6 ">
                <Outlet />
            </div>
        </div>
    );
}