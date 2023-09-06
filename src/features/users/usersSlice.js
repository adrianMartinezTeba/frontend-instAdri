import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService.js";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
    users : [],
    userLogged: user ? user : null,
    user: null,
    token: token ? token : null,
    isLoadingUser: false,
    isErrorUser: false,
    isSuccessUser: false,
    message: ''
};
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingUser = false;
            state.isSuccessUser = false;
            state.isErrorUser = false;
            state.message = '';

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isSuccessUser = true;
            })
            .addCase(register.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(register.rejected, (state) => {
                state.isErrorUser = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userLogged = action.payload.user;
                state.token = action.payload.token;
                state.isSuccessUser = true;
                state.message = action.payload.message;
            })
            .addCase(login.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(login.rejected, (state) => {
                state.isErrorUser = true;
            })
            .addCase(getUserLogged.fulfilled, (state, action) => {
                state.userLogged = action.payload;
                state.isSuccessUser = true;
            })
            .addCase(getUserLogged.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(getUserLogged.rejected, (state) => {
                state.isErrorUser = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userLogged = null;
                state.token = null;
            })
            .addCase(follow.fulfilled, (state) => {
                state.isSuccessUser = true;
            })
            .addCase(follow.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(follow.rejected, (state) => {
                state.isErrorUser = true;
            })
            .addCase(unFollow.fulfilled, (state) => {
                state.isSuccessUser = true;
            })
            .addCase(unFollow.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(unFollow.rejected, (state) => {
                state.isErrorUser = true;
            })
            .addCase(getUsers.fulfilled, (state,action) => {
                state.isSuccessUser = true;
                state.users = action.payload
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isErrorUser = true;
            })
            .addCase(getUserById.fulfilled, (state,action) => {
                state.isSuccessUser = true;
                state.user = action.payload.user
            })
            .addCase(getUserById.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(getUserById.rejected, (state) => {
                state.isErrorUser = true;
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
export const getUserLogged = createAsyncThunk("users/getUserLogged", async (thunkAPI) => {
    try {
        return await usersService.getUserLogged();
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
});
export const follow = createAsyncThunk("users/follow", async (userId, thunkAPI) => {
    try {
        return await usersService.follow(userId);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
});
export const unFollow = createAsyncThunk("users/unfollow", async (userId, thunkAPI) => {
    try {
        return await usersService.unFollow(userId);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
})
export const getUsers = createAsyncThunk("users/getUsers", async (thunkAPI) => {
    try {
        return await usersService.getUsers();
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
})
export const getUserById = createAsyncThunk("users/getUserById", async (userId, thunkAPI) => {
    try {
        return await usersService.getUserById(userId);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
})
export const { reset } = usersSlice.actions;
export default usersSlice.reducer;