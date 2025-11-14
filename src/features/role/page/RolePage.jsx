import React, { useEffect, useState } from 'react'
import { getRoles } from '../roleSlice';
import { useAbac } from '../../dashboard/useAbac';
import { useDispatch } from 'react-redux';

const RolePage = () => {
    const dispatch = useDispatch();

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 ALWAYS CALL HOOKS AT TOP LEVEL
    const canRead = useAbac("MANAGE_ROLE", "VIEW");
    const canCreate = useAbac("MANAGE_ROLE", "CREATE");
    const canEdit = useAbac("MANAGE_ROLE", "EDIT");
    const canDelete = useAbac("MANAGE_ROLE", "DELETE");

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

    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    if (!canRead) {
        return <div className="p-6 text-red-500">You do not have permission to view roles.</div>;
    }

    const handleEdit = (role) => {
        console.log("Edit Role:", role);
        // open modal OR navigate to edit page
        // Example: navigate(`/roles/edit/${role.id}`);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this role?")) return;

        try {
            await dispatch(deleteRole(id)).unwrap();
            setRoles(roles.filter((r) => r.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Roles</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Role Name</th>
                            <th>Description</th>
                            <th>Enabled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role, index) => (
                            <tr key={role.id}>
                                <td>{index + 1}</td>
                                <td>{role.name}</td>
                                <td>{role.description || "-"}</td>
                                <td>
                                    {role.enabled ? (
                                        <span className="badge badge-success">ENABLED</span>
                                    ) : (
                                        <span className="badge badge-error">DISABLED</span>
                                    )}
                                </td>

                                <td className="flex gap-3">
                                    {canEdit && (
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleEdit(role)}
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {canDelete && (
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleDelete(role.id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {canCreate && (
                    <button className="btn btn-primary mt-4">Create Role</button>
                )}
            </div>
        </div>
    );
}

export default RolePage