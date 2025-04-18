import { createSlice } from "@reduxjs/toolkit";

const initialState={currentSubSection:"",sectionData:[],subSectionData:[],currentVideo:null,courseData:{},courseProgress:[]}
const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        changeCurrentSubSection:(state,action)=>{
            state.currentSubSection=action.payload
        },
        changeSectionData:(state,action)=>{
            state.sectionData=action.payload
        },
        changeSubSectionData:(state,action)=>{
            state.subSectionData=action.payload
        },
        changeCurrentVideo:(state,action)=>{
            state.currentVideo=action.payload
        },
        changeCourseData:(state,action)=>{
            state.courseData=action.payload
        },
        changeCourseProgress:(state,action)=>{
            state.courseProgress=action.payload
        }

    }
})

export const {changeCurrentSubSection,changeCourseProgress,changeSectionData,changeSubSectionData,changeCourseData,changeCurrentVideo}=viewCourseSlice.actions
export default viewCourseSlice.reducer