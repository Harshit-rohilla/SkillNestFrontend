import {configureStore} from "@reduxjs/toolkit"
import navbarReducer from "../redux/slices/navbarSlice"
import globalReducer from "./slices/globalSlice"
import signUpReducer from "./slices/signUpSlice"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import categoryReducer from "./slices/categorySlice"
import addCourseReducer from "./slices/addCourseSlice"
import viewCourseReducer from "./slices/viewCourseSlice"

export const store=configureStore({
    reducer:{
        navbar:navbarReducer,
        global:globalReducer,
        signUp:signUpReducer,
        auth:authReducer,
        cart:cartReducer,
        category:categoryReducer,
        addCourse:addCourseReducer,
        viewCourse:viewCourseReducer
    }
})