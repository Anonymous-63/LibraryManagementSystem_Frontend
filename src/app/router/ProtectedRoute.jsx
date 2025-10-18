import { useSelector } from "react-redux";

export default function ProtectedRoute({ element, roles }) {
    const token = useSelector(state => state.auth.token);
    const user = getUserFromToken(token);

    if (!token) return <Navigate to="/login" />;
    if (roles && !roles.some(r => user?.roles?.includes(r)))
        return <Navigate to="/403" />;

    return element;
}