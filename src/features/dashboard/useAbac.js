import { useSelector } from "react-redux";

export const useAbac = (resourceType, action) => {
    const policies = useSelector((state) => state.auth?.policies || {});
    return policies?.[resourceType]?.[action] ?? false;
}