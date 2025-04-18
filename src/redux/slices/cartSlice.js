import { createSlice } from "@reduxjs/toolkit"

const initialState={cartData:[]}
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        setCartData:(state,action)=>{
            state.cartData=action.payload
        },
        removeFromCart:(state,action)=>{
            state.cartData= state.cartData.filter((obj)=>obj._id!==action.payload)
        }
    }
})
export const {setCartData,removeFromCart}=cartSlice.actions
export default cartSlice.reducer