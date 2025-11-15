import { useDispatch } from "react-redux";
import { usePermissions } from "../../../utils/usePermissions";
import { useEffect, useState } from "react";
import { RESOURCE_TYPE } from "../../../utils/constants";

const RolePage = () => {
    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Generic hook for all actions on MANAGE_ROLE
    const { canView, canCreate, canEdit, canDelete } = usePermissions(RESOURCE_TYPE.MANAGE_ROLE);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await dispatch(getRoles()).unwrap();
                setRoles(res.data);
            } catch (error) {
                console.error("Error loading roles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, [dispatch]);

    if (loading) return <div className="text-center p-6">Loading...</div>;
    if (!canView) return <div className="p-6 text-red-500">You do not have permission to view roles.</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Roles</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* ... table rows ... */}
                </table>

                {canCreate && <button className="btn btn-primary mt-4">Create Role</button>}
            </div>
        </div>
    );
};

export default RolePage;