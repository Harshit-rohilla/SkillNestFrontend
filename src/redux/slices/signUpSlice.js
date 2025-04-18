import {createSlice} from "@reduxjs/toolkit"

const initialState={formData:null}

const signUpSlice=createSlice({
    name:"signUp",
    initialState,
    reducers:{
        changeFormData:(state,action)=>{state.formData=action.payload}
    }
})

export const{changeFormData}=signUpSlice.actions
export default signUpSlice.reducer