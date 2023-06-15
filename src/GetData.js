import { ContactSupportOutlined } from "@mui/icons-material"
import React from "react"
import axios from "axios"


export default function Data(){

const[iscome,setcome] = React.useState(false)
const[data,setData] = React.useState()

React.useEffect(() =>{
axios.post("/login")
axios.get("/user")
.then(res => {setData(res.data)})
.then(res => setcome(true))
},[])


if(iscome === true){
   
    return data
}else{
    return "empty"
}

}