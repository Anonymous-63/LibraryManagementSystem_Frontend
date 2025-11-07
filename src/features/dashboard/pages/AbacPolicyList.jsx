import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AbacPolicyList() {
  const dispatch = useDispatch();
  const { policies, loading } = useSelector((state) => state.abac);

  useEffect(() => { dispatch(fetchPolicies()); }, [dispatch]);

  if (loading) return <div className="text-center py-10">Loading policies...</div>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3">Existing Policies</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Resource</th>
              <th>Action</th>
              <th>Effect</th>
              <th>Conditions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {policies.map((p) => (
              <tr key={p.id} className="hover">
                <td>{p.name}</td>
                <td>{p.resourceType}</td>
                <td>{p.action}</td>
                <td>
                  <span className={`badge ${p.effect === "ALLOW" ? "badge-success" : "badge-error"}`}>
                    {p.effect}
                  </span>
                </td>
                <td><pre className="text-xs">{p.conditions}</pre></td>
                <td>
                  <button onClick={() => dispatch(removePolicy(p.id))} className="btn btn-error btn-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}