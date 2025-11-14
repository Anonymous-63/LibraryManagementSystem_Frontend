import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/apiClient"

// Create policy
export const savePolicy = createAsyncThunk(
    'abacPolicy/save',
    async (policyData) => {
        const res = await api.post('/policies', policyData, { withCredentials: true });
        return res.data;
    }
);

// Update policy
export const updatePolicy = createAsyncThunk(
    'abacPolicy/update',
    async ({ id, policyData }) => {
        const res = await api.put(`/policies/${id}`, policyData, { withCredentials: true });
        return res.data;
    }
);

export const getPolicies = createAsyncThunk("abacPolicy/get", async () => {
  const res = await api.get("/policies", { withCredentials: true });
  return res.data;
});

export const getMyPolicies = createAsyncThunk("abacPolicy/mine", async () => {
  const res = await api.get("/policies/mine", { withCredentials: true });
  return res.data;
});