import { useDispatch } from "react-redux";
import AbacPolicyForm from "./AbacPolicyForm";
import { useEffect } from "react";
import { useAbac } from "../useAbac";
import { setPolicies } from "../../auth/authSlice";
import { getPolicies } from "../dashboardSlice";


const DashboardPage = () => {
  const dispatch = useDispatch();

  // Fetch policies from backend on mount
  useEffect(() => {
    const res = dispatch(getPolicies());
    dispatch(setPolicies(res.data))
  }, []);

  const canRead = useAbac("doc", "ADD");
  const canUpdate = useAbac("doc", "UPDATE");
  const canViewAdminPanel = useAbac("ADMIN_PANEL", "VIEW");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ABAC Policy Management</h1>
      <AbacPolicyForm />
      {/* <AbacPolicyList /> */}
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-6">📚 Book Management</h1>

        {/* READ Section */}
        {canRead ? (
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">Book List</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Spring Boot in Action</li>
              <li>Clean Code</li>
              <li>Effective Java</li>
            </ul>
          </div>
        ) : (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
            ❌ You are not allowed to view books.
          </div>
        )}

        {/* UPDATE Button */}
        <div className="mb-6">
          {canUpdate ? (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              ✏️ Edit Book
            </button>
          ) : (
            <button
              className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              🔒 Edit Disabled
            </button>
          )}
        </div>

        {/* ADMIN PANEL Access */}
        {canViewAdminPanel ? (
          <div className="bg-green-100 p-4 rounded">
            <h2 className="font-semibold text-green-700 mb-2">Admin Panel</h2>
            <p>Welcome, Admin. You can manage configurations here.</p>
          </div>
        ) : (
          <div className="bg-yellow-50 text-yellow-700 p-3 rounded">
            ⚠️ You don’t have access to the Admin Panel.
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage