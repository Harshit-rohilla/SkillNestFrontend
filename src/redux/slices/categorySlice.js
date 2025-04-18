import { createSlice } from "@reduxjs/toolkit";

const initialState={allCategories:[]}
const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setCategories:(state,action)=>{
            state.allCategories=action.payload
        }
    }
})

export const {setCategories}=categorySlice.actions
export default categorySlice.reducer