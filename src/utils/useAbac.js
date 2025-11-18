export default function useAbac() {
  const { policies } = useSelector((state) => state.auth?.policies || {});

  const check = (resource, action) => {
    if (!policies) return false;

    return policies.some(
      (p) => p.resource === resource && p.actions.includes(action)
    );
  };

  return { check };
}