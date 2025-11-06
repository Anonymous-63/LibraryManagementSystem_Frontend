import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/apiClient"

export const savePolicy = createAsyncThunk('/abac-policy/add', async (policyData) => {
    const res = await api.post('/abac-policy/add', policyData, { withCredentials: true })
    return res.data
})