import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";
let post
const initialState = {
  posts: [],
  post: post ? post : null,
  isLoadingPost: false,
  isErrorPost: false,
  message:'',
  isSuccessPost: false
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoadingPost = false;
      state.isErrorPost = false;
      state.message = '';
      state.isSuccessPost = false;
    },
    resetPost : (state) => {
      state.post = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createPost.fulfilled, (state, action) => {
      state.message = 'Creado correctamente'
      state.isSuccessPost = true
    })
    .addCase(createPost.pending, (state) => {
      state.isLoadingPost = true;
    })
    .addCase(createPost.rejected, (state) => {
      state.isErrorPost = true;
    })
    .addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.isSuccessPost = true
    })
    .addCase(getAllPosts.pending, (state) => {
      state.isLoadingPost = true;
    })
    .addCase(getAllPosts.rejected, (state) => {
      state.isErrorPost = true;
    })
    .addCase(getPostById.fulfilled, (state, action) => {
      state.post = action.payload
      state.isSuccessPost = true
      state.message = 'Obtenido correctamente'
      
    })
    .addCase(getPostById.pending, (state) => {
      state.isLoadingPost = true;
    })
    .addCase(getPostById.rejected, (state) => {
      state.isErrorPost = true;
    })
    .addCase(like.fulfilled, (state,action) => {
      state.isSuccessPost = true
      state.message = 'Obtenido correctamente'
      state.post = action.payload.like
    })
    .addCase(like.pending, (state) => {
      state.isLoadingPost = true;
    })
    .addCase(like.rejected, (state) => {
      state.isErrorPost = true;
    })
    .addCase(unLike.fulfilled, (state, action) => {
      state.isSuccessPost = true
      state.message = 'Obtenido correctamente'
      state.post = action.payload.unlike
    })
    .addCase(unLike.pending, (state) => {
      state.isLoadingPost = true;
    })
    .addCase(unLike.rejected, (state) => {
      state.isErrorPost = true;
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
export const like = createAsyncThunk("posts/like ", async (id,thunkAPI) => {
    try {
      return await postsService.like(id);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(message);
    } 
}
);
export const unLike = createAsyncThunk("posts/unLike ", async (id,thunkAPI) => {
  try {
    return await postsService.unLike(id);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(message);
  } 
}
);
export const { reset,resetPost } = postsSlice.actions;
export default postsSlice.reducer;