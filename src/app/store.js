import { configureStore } from '@reduxjs/toolkit'
import users from '../features/users/usersSlice'
import posts from '../features/posts/postsSlice'

export const store = configureStore({
  reducer: {
 posts,
    users
  },
})