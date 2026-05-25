import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import {
    currentUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
} from "./authApi"

const initialState = {
    user: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
}

const getErrorPayload = (error) => ({
    message: error?.response?.data?.message ?? "Something went wrong.",
    errors: error?.response?.data?.errors ?? null,
    status: error?.response?.status ?? null,
})

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            return await loginRequest(credentials)
        } catch (error) {
            return rejectWithValue(getErrorPayload(error))
        }
    }
)

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data, { rejectWithValue }) => {
        try {
            return await registerRequest(data)
        } catch (error) {
            return rejectWithValue(getErrorPayload(error))
        }
    }
)

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            return await currentUserRequest()
        } catch (error) {
            return rejectWithValue(getErrorPayload(error))
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await logoutRequest()
        } catch (error) {
            return rejectWithValue(getErrorPayload(error))
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null
        },
        resetAuthState: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.status = "idle"
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder

            // login
            .addCase(loginUser.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed"
                state.isAuthenticated = false
                state.error = action.payload
            })

            // register
            .addCase(registerUser.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed"
                state.isAuthenticated = false
                state.error = action.payload
            })

            // fetchCurrentUser
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.status = "idle"
                state.user = null
                state.isAuthenticated = false
            })
            
            // logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.status = "idle"
                state.error = null
            })
    },
})

export const { clearAuthError, resetAuthState } = authSlice.actions

export const selectAuthStatus = (state) => state.auth.status
export const selectAuthError = (state) => state.auth.error
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated

export default authSlice.reducer
