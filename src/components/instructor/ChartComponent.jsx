import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCallback, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent({data,isSwitch}){
    const generateRandomColor=useCallback((length)=>{
            const arrayOfRandomColors=[]
            for(let i=0; i<length; i++){
                arrayOfRandomColors.push(`rgb(${Math.floor(Math.random()*255+1)},${Math.floor(Math.random()*255+1)},${Math.floor(Math.random()*255+1)})`)
            }
            return arrayOfRandomColors
    },[isSwitch])
    const studentChartData=useMemo(()=>{
        return {
            labels:data.map((course)=>course?.title),
            datasets:[{label:data?.course?.title,
                data:data.map((course)=>course?.studentsEnrolled?.length),
                backgroundColor:generateRandomColor(data.length)
            }]
        }
    },[data])
    const incomeChartData=useMemo(()=>{
        return {
            labels:data.map((course)=>course?.title),
            datasets:[{label:data?.course?.title,
                data:data.map((course)=>course?.studentsEnrolled?.length*course?.price),
                backgroundColor:generateRandomColor(data.length)
            }]
        }
    },[data])

    return(
        <>
        <div className='w-full min-h-80 max-h-[500px]'>
        <Pie data={isSwitch?incomeChartData:studentChartData} options={{responsive: true, maintainAspectRatio: false,}}/>
        </div>
        </>
    )
}

export default ChartComponent