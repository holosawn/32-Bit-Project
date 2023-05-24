import { useState , useRef ,useEffect } from "react"
import axios from "axios"
import {Container , Table , TableBody , TableCell , TableContainer , TableHead , TableRow} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

const HataListesi = () => {

    const [data , setData] = useState([])

    useEffect(() => {
        axios.post("/login")
          .then(() => axios.get("/user"))
          .then(res => {setData(res.data.ErrorsData)
                        console.log(res.data.ErrorsData)})
       
        }, [])

    return(
    <Container>
        <h1>Hata Listesi</h1>
        </Container>
    )
}

export default HataListesi