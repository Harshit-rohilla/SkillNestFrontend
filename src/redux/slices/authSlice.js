import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    userData:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        
        changeLoading:(state,action)=>{
            state.loading=action.payload
        },
        changeUserData:(state,action)=>{
            state.userData=action.payload
        }
    }
})

export const {changeLoading,changeUserData}=authSlice.actions
export default authSlice.reducer