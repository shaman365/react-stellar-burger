import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../utils/api'

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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return res.user;
    }
);

export const getUser = createAsyncThunk(
    "user/getUser",
    async () => {
        const res = await api.getUser();
        return res.user
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (user) => {
        const res = await api.updateUser(user);
        return res.user
    }
);

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .then(res => {
                    dispatch(setUser(res.payload));
                })
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        }
        else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const userSlice = createSlice({
    name: 'userData',
    initialState: {
        user: null,
        isAuthChecked: false,
        status: null
    },
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearStatus: (state) => {
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.status = 'fulfilled';
            })
            .addCase(login.rejected, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.status = 'rejected';
            })

            .addCase(logout.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'rejected';
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null;
                state.status = 'fulfilled';
            })


            .addCase(updateUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'rejected';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'fulfilled';
            })

            .addCase(register.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.status = 'fulfilled';
            })
            .addCase(register.rejected, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.status = 'rejected';
            })


    }
})

export const {
    setAuthChecked,
    setUser,
    clearStatus,
} = userSlice.actions;

export default userSlice.reducer
