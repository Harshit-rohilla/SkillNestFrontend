import axios from "axios"
const axiosInstance=axios.create({withCredentials: true})
export const apiConnector=(method,url,data=null,headers=null,params=null)=>{
    return axiosInstance({
        method,
        url,
        data,
        headers,
        params
    })
}

