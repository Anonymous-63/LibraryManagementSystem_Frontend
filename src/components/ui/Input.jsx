import { Controller } from "react-hook-form";

export const FormInput = ({ name, label, type = "text", placeholder = "", control, errors, }) => {
    const errorMessage = errors?.[name]?.message;

    return (
        <div className="form-control w-full mb-4">
            {label && (
                <label  className="label mb-2">{label}</label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        className={`input rounded-md w-full ${errorMessage ? "input-error" : ""
                            }`}
                    />
                )}
            />

            {errorMessage && (
                <label className="label mt-1">
                    <span className="label-text-alt text-error">{errorMessage}</span>
                </label>
            )}
        </div>
    );
}