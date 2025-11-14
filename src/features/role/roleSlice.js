import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/apiClient"

// Create policy
export const saveRole = createAsyncThunk(
    'role/save',
    async (policyData) => {
        const res = await api.post('/roles', policyData, { withCredentials: true });
        return res.data;
    }
);

// Update policy
export const updateRole = createAsyncThunk(
    'roles/update',
    async ({ id, policyData }) => {
        const res = await api.put(`/roles/${id}`, policyData, { withCredentials: true });
        return res.data;
    }
);

export const getRoles = createAsyncThunk('roles/get', async () => {
    try {

        const res = await api.get(`/roles`, { withCredentials: true })
        return res.data;
    } catch (error) {
        console.log(error);

    }
})

export const deleteRole = createAsyncThunk(
  'roles/delete',
  async (id) => {
    const res = await api.delete(`/roles/${id}`, { withCredentials: true });
    return res.data;
  }
);
