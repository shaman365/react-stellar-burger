import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

const getUser = () => {
    return 
}

export const login = createAsyncThunk(
    "user/login",
    async (userData) => {
        const res = await api.login(userData);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (userData) => {
        const res = await api.register(userData);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {        
        const token = localStorage.getItem("refreshToken");
        const res = await api.logout(token);
        localStorage.setItem("accessToken", null);
        localStorage.setItem("refreshToken", null);

        //почистить state.user
        return res.user;
    }
);

export const forgotPassword = createAsyncThunk(
    "user/forgot",
    async (emailData) => {
        const res = await api.forgot(emailData);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const resetPassword = createAsyncThunk(
    "user/reset",
    async (passwordData) => {        
        const res = await api.reset(passwordData);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const userSlice = createSlice({
    name: 'userData',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
    }
})

export default userSlice.reducer
