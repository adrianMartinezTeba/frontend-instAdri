import { configureStore } from '@reduxjs/toolkit'
import users from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
 
    users
  },
})