import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  isError: false,
  message:''
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';

    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createPost.fulfilled, (state, action) => {
      state.message = 'Creado correctamente'
    })
    .addCase(createPost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createPost.rejected, (state) => {
      state.isError = true;
    })
  },
});

export const createPost = createAsyncThunk("posts/createPost ",
async (post,thunkAPI) => {
    try {
      return await postsService.createPost(post);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const { reset } = postsSlice.actions;
export default postsSlice.reducer;