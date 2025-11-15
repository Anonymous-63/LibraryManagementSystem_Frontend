import Button from "daisyui/components/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getMyPolicies } from "../../policy/policySlice";
import { setPolicies } from "../../auth/authSlice";
import { useDispatch } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToRoles = () => {
    navigate("/roles");
  };

  const goToPolicies = () => {
    navigate("/policies");
  };

  useEffect(() => {
    const load = async () => {
      const myPolicies = await dispatch(getMyPolicies()).unwrap();
      dispatch(setPolicies(myPolicies));
    };

    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Page</h1>
      <div className="flex gap-4">
        <button onClick={goToRoles}>Go to Roles</button>
        <button onClick={goToPolicies}>Go to Policies</button>
      </div>
    </div>
  );
};

export default DashboardPage;
