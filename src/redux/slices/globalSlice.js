import {createSlice} from "@reduxjs/toolkit"

const initialState={loading:false, email:"",user:"",ratingAndReview:[]}

const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        changeLoading:(state,action)=>{
            state.loading=action.payload
        },
        changeEmail:(state,action)=>{
            state.email=action.payload
        },
        changeUser:(state,action)=>{
            state.user=action.payload
        },
        changeRatingAndReview:(state,action)=>{
            state.ratingAndReview=action.payload
        }
    }

})

export const {changeLoading,changeEmail,changeUser,changeRatingAndReview}=globalSlice.actions
export default globalSlice.reducer