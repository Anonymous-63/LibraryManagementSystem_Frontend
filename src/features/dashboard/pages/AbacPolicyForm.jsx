import { useDispatch } from "react-redux";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { savePolicy } from "../dashboardSlice";

export default function AbacPolicyForm() {
    const dispatch = useDispatch();

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "Test",
            description: "",
            resourceType: "MANAGE_ROLE",
            action: "VIEW",
            effect: "ALLOW",
            priority: 0,
            enabled: true,
            conditions: [
                {
                    category: "subject",
                    attribute: "roles",
                    operator: "CONTAINS",
                    value: "ROLE_ADMIN",
                    connector: null,
                    group: null,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "conditions",
    });

    const onSubmit = (data) => {
        const payload = {
            ...data,
            conditions: JSON.stringify(data.conditions), // store as raw JSON
        };

        console.log("Submitting ABAC Policy:", payload);
        dispatch(savePolicy(payload));
        reset();
    };

    return (
        <div className="bg-base-100 shadow-xl rounded-xl p-6 border border-base-200 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create ABAC Policy</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Top Fields */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Policy Name */}
                    <input
                        {...register("name")}
                        placeholder="Policy Name"
                        className="input input-bordered w-full"
                    />

                    {/* Resource Type Dropdown */}
                    <select
                        {...register("resourceType")}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Resource Type</option>
                        <option value="MANAGE_OPERATOR">MANAGE_OPERATOR</option>
                        <option value="MANAGE_POLICY">MANAGE_POLICY</option>
                        <option value="MANAGE_ROLE">MANAGE_ROLE</option>
                    </select>

                    {/* Action Dropdown */}
                    <select
                        {...register("action")}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Action</option>
                        <option value="VIEW">VIEW</option>
                        <option value="CREATE">CREATE</option>
                        <option value="EDIT">EDIT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="DISABLE">DISABLE</option>
                        <option value="ENABLE">ENABLE</option>
                    </select>

                    {/* Effect */}
                    <select {...register("effect")} className="select select-bordered w-full">
                        <option value="ALLOW">ALLOW</option>
                        <option value="DENY">DENY</option>
                    </select>

                    {/* Priority */}
                    <input
                        type="number"
                        {...register("priority")}
                        placeholder="Priority"
                        className="input input-bordered w-full"
                    />

                    {/* Enabled Checkbox */}
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="checkbox" {...register("enabled")} />
                        Enabled
                    </label>
                </div>


                {/* Description */}
                <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />

                {/* Conditions Section */}
                <h3 className="font-semibold mt-4">Conditions</h3>

                {fields.map((field, index) => (
                    <div key={field.id} className="bg-base-200 p-3 rounded-lg mb-2">
                        <div className="grid grid-cols-6 gap-2 items-center">

                            {/* Category */}
                            <select
                                {...register(`conditions.${index}.category`)}
                                className="select select-bordered"
                            >
                                <option value="subject">subject</option>
                                <option value="resource">resource</option>
                                <option value="auth">auth</option>
                            </select>

                            {/* Attribute */}
                            <input
                                {...register(`conditions.${index}.attribute`)}
                                placeholder="attribute"
                                className="input input-bordered"
                            />

                            {/* Operator */}
                            <select
                                {...register(`conditions.${index}.operator`)}
                                className="select select-bordered"
                            >
                                <option value="EQ">==</option>
                                <option value="NE">!=</option>
                                <option value="GT">&gt;</option>
                                <option value="LT">&lt;</option>
                                <option value="GTE">&ge;</option>
                                <option value="LTE">&le;</option>
                                <option value="CONTAINS">contains</option>
                                <option value="NOT_CONTAINS">not contains</option>
                                <option value="IN">in</option>
                                <option value="NOT_IN">not in</option>
                            </select>

                            {/* Value */}
                            <input
                                {...register(`conditions.${index}.value`)}
                                placeholder="Value"
                                className="input input-bordered"
                            />

                            {/* Connector */}
                            <select
                                {...register(`conditions.${index}.connector`)}
                                className="select select-bordered"
                            >
                                <option value="">(none)</option>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>

                            {/* Group */}
                            <input
                                {...register(`conditions.${index}.group`)}
                                placeholder="Group (optional)"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="flex justify-end mt-2">
                            <button type="button" onClick={() => remove(index)} className="btn btn-error btn-sm">
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add Condition */}
                <button
                    type="button"
                    onClick={() =>
                        append({
                            category: "subject",
                            attribute: "",
                            operator: "==",
                            value: "",
                            connector: null,
                            group: null,
                        })
                    }
                    className="btn btn-outline btn-sm"
                >
                    + Add Condition
                </button>

                {/* Submit */}
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-full">
                        savePolicyy
                    </button>
                </div>
            </form>
        </div>
    );
}

