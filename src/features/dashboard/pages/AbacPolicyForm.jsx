import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { savePolicy } from "../dashboardSlice";

export default function AbacPolicyForm() {
    const dispatch = useDispatch();
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "Test",
            description: "",
            resourceType: "doc",
            action: "ADD",
            effect: "ALLOW",
            conditions: [{ category: "subject", attribute: "roles", operator: "==", value: "ROLE_ADMIN" }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "conditions" });

    const onSubmit = (data) => {
        console.log("Data ", data);

        dispatch(savePolicy(data));
        reset();
    };

    return (
        <div className="bg-base-100 shadow-xl rounded-xl p-6 border border-base-200">
            <h2 className="text-xl font-bold mb-4">Create ABAC Policy</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input {...register("name")} placeholder="Policy Name" className="input input-bordered w-full" />
                    <input {...register("resourceType")} placeholder="Resource Type (e.g. user)" className="input input-bordered w-full" />
                    <input {...register("action")} placeholder="Action (e.g. ADD)" className="input input-bordered w-full" />
                    <select {...register("effect")} className="select select-bordered w-full">
                        <option value="ALLOW">ALLOW</option>
                        <option value="DENY">DENY</option>
                    </select>
                </div>

                <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />

                <h3 className="font-semibold mt-4">Conditions</h3>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center mb-2">
                        <select {...register(`conditions.${index}.category`)} className="select select-bordered">
                            <option value="subject">subject</option>
                            <option value="resource">resource</option>
                            <option value="resource">auth</option>
                        </select>
                        <input {...register(`conditions.${index}.attribute`)} placeholder="attribute" className="input input-bordered" />
                        <select {...register(`conditions.${index}.operator`)} className="select select-bordered">
                            <option value="==">==</option>
                            <option value="!=">!=</option>
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                            <option value=">=">&ge;</option>
                            <option value="<=">&le;</option>
                            <option value="contains">contains</option>
                            <option value="!contains">not contains</option>
                            <option value="in">in</option>
                            <option value="!in">not in</option>
                        </select>
                        <input {...register(`conditions.${index}.value`)} placeholder="value" className="input input-bordered" />
                        <button type="button" onClick={() => remove(index)} className="btn btn-error btn-sm">X</button>
                    </div>
                ))}

                <button type="button" onClick={() => append({ category: "subject", attribute: "", operator: "==", value: "" })} className="btn btn-sm btn-outline">
                    + Add Condition
                </button>

                <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-full">Save Policy</button>
                </div>
            </form>
        </div>
    );
}