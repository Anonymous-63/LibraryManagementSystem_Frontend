import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/apiClient"

// Create policy
export const savePolicy = createAsyncThunk(
    'abacPolicy/save',
    async (policyData) => {
        const res = await api.post('/abac-policies', policyData, { withCredentials: true });
        return res.data;
    }
);

// Update policy
export const updatePolicy = createAsyncThunk(
    'abacPolicy/update',
    async ({ id, policyData }) => {
        const res = await api.put(`/abac-policies/${id}`, policyData, { withCredentials: true });
        return res.data;
    }
);

export const getPolicies = createAsyncThunk('abacPolicy/get', async () => {
    try {

        const res = await api.get(`/books`, { withCredentials: true })
        return res.data;
    } catch (error) {
        console.log(error);

    }
})