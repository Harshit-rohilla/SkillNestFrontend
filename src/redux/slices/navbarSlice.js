import {createSlice} from "@reduxjs/toolkit"


const initialState={
    token:null,
    profile:"student"
}
const navbarSlice= createSlice({
    name:"navbar",
    initialState,
    reducers:{
        changeToken:(initialState,action)=>{
            initialState.token=action.payload
        },
        changeProfile:(initialState,action)=>{
            initialState.profile=action.payload
        }
    }

})

export const {changeProfile, changeToken}=navbarSlice.actions
export default navbarSlice.reducer