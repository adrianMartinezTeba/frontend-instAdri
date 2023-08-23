import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService.js";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
    user: user ? user : null,
    token: token ? token : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.rejected, (state) => {
                state.isError = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state) => {
                state.isError = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
              })
    },
});

export const register = createAsyncThunk(
    "users/register",
    async (userData, thunkAPI) => {
        try {
            return await usersService.register(userData);
        } catch (error) {
            const message = error.response.data.errors[0].message;
            return thunkAPI.rejectWithValue(message);//action.payload
        }
    }
);
export const login = createAsyncThunk("users/login", async (userData, thunkAPI) => {
    try {
        return await usersService.login(userData);
    } catch (error) {
        console.error(error);
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message);
    }
});
export const logout = createAsyncThunk("users/logout", async (thunkAPI) => {
    try {
      return await usersService.logout();
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(message);
    }
  });
export const { reset } = usersSlice.actions;
export default usersSlice.reducer;