import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  post: {},
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
    .addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.message = 'Creado correctamente'
    })
    .addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllPosts.rejected, (state) => {
      state.isError = true;
    })
    .addCase(getPostById.fulfilled, (state, action) => {
      state.post = action.payload
      state.message = 'Obtenido correctamente'
    })
    .addCase(getPostById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getPostById.rejected, (state) => {
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
export const getAllPosts = createAsyncThunk("posts/getAllPosts ",
async (thunkAPI) => {
    try {
      return await postsService.getAllPosts();
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
  
);
export const getPostById = createAsyncThunk("posts/getPostById ",
async (id,thunkAPI) => {
    try {
      return await postsService.getPostById(id);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
  
);
export const { reset } = postsSlice.actions;
export default postsSlice.reducer;