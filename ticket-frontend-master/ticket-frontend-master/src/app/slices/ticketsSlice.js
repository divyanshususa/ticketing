import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tickets: "",
    allUsersAvailable: "",
    company: ""

}


export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        allTicket: (state, action) => {
            state.tickets = action.payload;
            // state.allUsers = action.payload.user;
        },
        allUsers: (state, action) => {
            if (action.payload !== "") {

                let user = action.payload
                // console.log(user);
                state.allUsersAvailable = user?.filter((user) => user.name !== "admin");
            }
            else state.allUsersAvailable = ""
        },
        allCompany: (state, action) => {
            state.company = action.payload
            // state.allUsers = action.payload.user;
        }
    },
})
export const { allTicket, allUsers, allCompany } = ticketSlice.actions

export default ticketSlice.reducer