import { createSlice } from "@reduxjs/toolkit";

const initialState={step:1,step1Data:{},isEdit:false,sectionData:{}}

const addCourseSlice=createSlice({
    name:"addCourse",
    initialState,
    reducers:{
        changeStep:(state,action)=>{
            state.step=action.payload
        },
        changeStep1Data:(state,action)=>{
            state.step1Data=action.payload
        },
        changeIsEdit:(state,action)=>{
            state.isEdit=action.payload
        },
        changeSectionData:(state,action)=>{
            state.sectionData=action.payload
        }
    }
})

export const {changeStep,changeStep1Data,changeIsEdit,changeSectionData}=addCourseSlice.actions
export default addCourseSlice.reducer