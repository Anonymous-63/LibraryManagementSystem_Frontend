import { useDispatch } from "react-redux";
import AbacPolicyForm from "./AbacPolicyForm";
import { useEffect, useState } from "react";
import { useAbac } from "../useAbac";
import { setPolicies } from "../../auth/authSlice";
import { getMyPolicies, getPolicies } from "../dashboardSlice";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [policiesData, setPoliciesData] = useState([]);

  // Fetch all policies (admin view)
  const fetchPolicies = async () => {
    try {
      const res = await dispatch(getPolicies()).unwrap();

      setPoliciesData(res.data);
    } catch (error) {
      console.error("Error loading policies:", error);
      setPoliciesData([]); // fail-safe
    }
  };

  useEffect(() => {
    const load = async () => {
      // Load all policies for table
      await fetchPolicies();

      // Load user's allowed ABAC permissions
      const myPolicies = await dispatch(getMyPolicies()).unwrap();
      dispatch(setPolicies(myPolicies));
    };

    load();
  }, []);

  // ABAC checks
  const canRead = useAbac("MANAGE_POLICY", "VIEW");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ABAC Policy Management</h1>

      {/* --- FLEX CONTAINER --- */}
      <div className="flex gap-6">

        {/* LEFT SIDE: FORM */}
        <div className="w-1/2 p-4 rounded shadow">
          <AbacPolicyForm />
        </div>

        {/* RIGHT SIDE: TABLE */}
        <div className="w-1/2 p-4 rounded shadow overflow-auto">
          {canRead && (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Policy Name</th>
                  <th>Resource</th>
                  <th>Action</th>
                  <th>Effect</th>
                  <th>Enabled</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(policiesData) && policiesData.length > 0 ? (
                  policiesData.map((policy) => (
                    <tr key={policy.id}>
                      <td>{policy.id}</td>
                      <td>{policy.name}</td>
                      <td>{policy.resourceType || "-"}</td>
                      <td>{policy.action || "-"}</td>
                      <td>{policy.effect || "-"}</td>
                      <td>
                        {policy.enabled ? (
                          <span className="badge badge-success">ENABLED</span>
                        ) : (
                          <span className="badge badge-error">DISABLED</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 py-3">
                      No policies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
      {/* --- END FLEX CONTAINER --- */}

      <button
        onClick={() => navigate("/roles")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        ✏️ Edit Roles
      </button>
    </div>

  );
};

export default DashboardPage;
