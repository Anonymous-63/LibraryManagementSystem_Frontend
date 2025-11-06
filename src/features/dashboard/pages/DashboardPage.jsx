import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { FormInput } from "../../../components/ui/Input";
import { savePolicy } from "../dashboardSlice";
import { useState } from "react";
import { NotificationService } from "../../../services/NotificationService";

const schema = yup.object({
  name: yup
    .string(),
  description: yup
    .string(),
  resourceType: yup
    .string(),
  action: yup
    .string(),
});


const ATTRIBUTE_OPTIONS = {
  subject: ["department", "role", "location"],
  resource: ["type", "owner", "classification"],
  environment: ["time", "ip", "region"]
};

const OPERATORS = ["=", "!=", ">", "<", ">=", "<="];

const DashboardPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "Test Policy1",
      description: "Test Policy With Condition",
      resourceType: "user",
      action: "ADD",
    },
  });

  const onFinish = async (values) => {
    try {
      const payload = {
      ...values,
      conditions, // 👈 merge your state-based conditions
    };
      const res = await dispatch(savePolicy(payload)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      // NotificationService.success(err);
      console.log(err);
    }
  };


  const [policy, setPolicy] = useState({
    name: "Test",
    description: "",
    resourceType: "user",
    action: "ADD",
  });
  const [conditions, setConditions] = useState([
    { category: "subject", attribute: "roles", operator: "=", value: "ADMIN" },
  ]);

  const [saving, setSaving] = useState(false);

  const handlePolicyChange = (e) => {
    setPolicy({ ...policy, [e.target.name]: e.target.value });
  };

  const handleConditionChange = (index, field, value) => {
    const updated = [...conditions];
    updated[index][field] = value;
    setConditions(updated);
  };

  const addCondition = () => {
    setConditions([
      ...conditions,
      { category: "subject", attribute: "department", operator: "=", value: "" },
    ]);
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  return (
    // <div className="card card-border bg-base-100 w-96 shadow-md">
    //   <div className="card-body">
    //     <h2 className="card-title text-xl mb-4">Policy Form</h2>
    //     <form onSubmit={handleSubmit(onFinish)}>
    //       <FormInput
    //         name="name"
    //         label="Name"
    //         type="text"
    //         placeholder="Enter Policy Name"
    //         control={control}
    //         errors={errors}
    //       />
    //       <FormInput
    //         name="description"
    //         label="Description"
    //         type="text"
    //         placeholder="Enter policy description"
    //         control={control}
    //         errors={errors}
    //       />
    //       <FormInput
    //         name="resourceType"
    //         label="resourceType"
    //         type="text"
    //         placeholder="Enter resourceType"
    //         control={control}
    //         errors={errors}
    //       />
    //       <FormInput
    //         name="action"
    //         label="Action"
    //         type="text"
    //         placeholder="Enter Action"
    //         control={control}
    //         errors={errors}
    //       />
    //       <div className="card-actions mb-4">
    //         <button type='submit' className="btn btn-primary rounded-lg w-full">Sign in</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <form onSubmit={handleSubmit(onFinish)}>
      <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">ABAC Policy Builder</h2>

        {/* Policy Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="label">Policy Name</label>
            <input
              name="name"
              className="input input-bordered w-full"
              placeholder="Enter policy name"
              value={policy.name}
              onChange={handlePolicyChange}
            />
          </div>
          <div>
            <label className="label">Resource Type</label>
            <input
              name="resourceType"
              className="input input-bordered w-full"
              placeholder="e.g. document"
              value={policy.resourceType}
              onChange={handlePolicyChange}
            />
          </div>
          <div>
            <label className="label">Action</label>
            <input
              name="action"
              className="input input-bordered w-full"
              placeholder="e.g. READ / WRITE"
              value={policy.action}
              onChange={handlePolicyChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Describe the purpose of this policy"
              rows="2"
              value={policy.description}
              onChange={handlePolicyChange}
            ></textarea>
          </div>
        </div>

        {/* Condition Builder */}
        <h3 className="text-lg font-semibold mb-3">Conditions</h3>

        {conditions.map((cond, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center gap-3 mb-3 bg-base-100 p-3 rounded-lg"
          >
            {/* Category */}
            <select
              className="select select-bordered select-sm"
              value={cond.category}
              onChange={(e) =>
                handleConditionChange(index, "category", e.target.value)
              }
            >
              {Object.keys(ATTRIBUTE_OPTIONS).map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            {/* Attribute */}
            <select
              className="select select-bordered select-sm"
              value={cond.attribute}
              onChange={(e) =>
                handleConditionChange(index, "attribute", e.target.value)
              }
            >
              {ATTRIBUTE_OPTIONS[cond.category].map((attr) => (
                <option key={attr}>{attr}</option>
              ))}
            </select>

            {/* Operator */}
            <select
              className="select select-bordered select-sm"
              value={cond.operator}
              onChange={(e) =>
                handleConditionChange(index, "operator", e.target.value)
              }
            >
              {OPERATORS.map((op) => (
                <option key={op}>{op}</option>
              ))}
            </select>

            {/* Value */}
            <input
              type="text"
              className="input input-bordered input-sm"
              placeholder="Value"
              value={cond.value}
              onChange={(e) =>
                handleConditionChange(index, "value", e.target.value)
              }
            />

            <button
              className="btn btn-error btn-sm text-white"
              onClick={() => removeCondition(index)}
            >
              ✕
            </button>
          </div>
        ))}

        <button className="btn btn-primary btn-sm mb-6" onClick={addCondition}>
          + Add Condition
        </button>

        {/* Preview JSON */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Preview:</h4>
          <pre className="bg-base-300 p-3 rounded text-sm overflow-auto">
            {JSON.stringify({ ...policy, conditions }, null, 2)}
          </pre>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            className={`btn btn-success ${saving ? "loading" : ""}`}
            type="submit"
          >
            Save Policy
          </button>
        </div>
      </div>
    </form>
  )
}

export default DashboardPage