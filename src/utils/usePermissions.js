import { useAbac } from "../features/dashboard/useAbac";
import { ACTION } from "./constants";

export const usePermissions = (resourceType, actions = Object.values(ACTION)) => {
  const perms = {};
  actions.forEach((action) => {
    perms[`can${action.charAt(0).toUpperCase() + action.slice(1).toLowerCase()}`] = useAbac(resourceType, action);
  });
  return perms;
};