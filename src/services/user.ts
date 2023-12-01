import { createSlice, createAsyncThunk, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit'
import api from '../utils/api'
import type { TUser, TUserData, TUserLoginData, TUserCommonResponse, TAsyncThunkConfig, TUserUpdateData, RootState } from "../types/types"

export const login = createAsyncThunk<TUser, TUserLoginData, TAsyncThunkConfig>(
    "user/login",
    async (userData) => {
        const res = await api.login(userData);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const register = createAsyncThunk<TUser, TUserUpdateData, TAsyncThunkConfig>(
    "user/register",
    async (userData) => {
        const res = await api.register(userData);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const logout = createAsyncThunk<TUserCommonResponse | undefined, void, TAsyncThunkConfig>(
    "user/logout",
    async () => {
        const token = localStorage.getItem("refreshToken");
        if (token) {
            const res = await api.logout();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return res;
        }
        return undefined
    }
);

export const getUser = createAsyncThunk<TUser, void, TAsyncThunkConfig>(
    "user/getUser",
    async () => {
        const res = await api.getUser();
        return res.user
    }
);

export const updateUser = createAsyncThunk<TUser, TUserUpdateData, TAsyncThunkConfig>(
    "user/updateUser",
    async (user) => {
        const res = await api.updateUser(user);
        return res
    }
);

export const checkUserAuth = (): ThunkAction<void, RootState, unknown, Action> => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .then(res => {
                    dispatch(setUser(res.payload as TUser));
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

const initialState: TUserData = {
    user: null,
    isAuthChecked: false,
    status: ''
};

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action: PayloadAction<TUser | null>) => {
            state.user = action.payload;
        },
        clearStatus: (state) => {
            state.status = '';
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
                // state.user = action.payload;
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
                // state.user = action.payload;
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
