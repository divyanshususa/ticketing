import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import ticketReducer from './slices/ticketsSlice'
export const store = configureStore({
    reducer: {
        "user": userReducer,
        "tickets": ticketReducer
    },
})