import { Outlet } from 'react-router'

const AuthLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout