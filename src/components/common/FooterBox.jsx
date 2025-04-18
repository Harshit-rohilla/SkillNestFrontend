import { Link } from "react-router-dom"

function FooterBox({obj}){
    return(
        <>
        <div>
            <h1 className="text-lg mb-2 font-medium text-[#AFB2BF]">{obj.title}</h1>
            <div className="flex flex-col gap-2">
                {(obj.links).map((val,index)=>(<Link key={index} to={val.link}><p className="text-xs hover:text-[#AFB2BF] text-[#6E727F]">{val.title}</p></Link>))}
            </div>
        </div>
        </>
    )
}
export default FooterBox