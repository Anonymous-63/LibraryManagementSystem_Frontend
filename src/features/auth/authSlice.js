import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";
import api from "../../services/apiClient";
import { jwtDecode } from "jwt-decode"

function getUserFromToken(token) {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return {
            id: decoded.userId,
            email: decoded.sub,
            roles: decoded.roles,
        };
    } catch (e) {
        console.error('Invalid token', e);
        return null;
    }
}

function getPrivilegesFromToken(token) {
    if (!token) return [];
    try {
        const decoded = jwtDecode(token);
        return decoded.privileges || [];
    } catch {
        return [];
    }
}

const accessToken = storage.get('accessToken');

const initialState = {
    user: getUserFromToken(accessToken),
    accessToken: accessToken || null,
    privileges: getPrivilegesFromToken(accessToken),
    status: 'idle',
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
    const res = await api.post('/auth/login', credentials, { withCredentials: true })
    return res.data
})

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    await api.post('/auth/logout', {}, { withCredentials: true })
})

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        refreshTokenSuccess(state, action) {
            state.accessToken = action.payload
            const decoded = jwtDecode(action.payload)
            state.user = {
                id: decoded.userId,
                email: decoded.sub,
                roles: decoded.roles
            }
            state.privileges = decoded.privileges || []
            storage.set('accessToken', action.payload)
        },
        logout(state) {
            state.user = null
            state.accessToken = null
            state.privileges = []
            storage.remove('accessToken')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, s => { s.status = 'loading' })
            .addCase(login.fulfilled, (s, action) => {
                s.status = 'succeeded'
                const decoded = jwtDecode(action.payload.accessToken)
                s.user = {
                    id: decoded.userId,
                    email: decoded.sub,
                    roles: decoded.roles
                }
                s.privileges = decoded.privileges || []
                s.accessToken = action.payload.accessToken
                storage.set('accessToken', action.payload.accessToken)
            })
            .addCase(login.rejected, s => { s.status = 'failed' })
            .addCase(logoutThunk.fulfilled, s => {
                s.user = null
                s.accessToken = null
                s.privileges = []
                storage.remove('accessToken')
            })
    }
})

export const { logout, refreshTokenSuccess } = slice.actions
export default slice.reducer