import { FiveK } from "@mui/icons-material"
import { Field, useField } from "formik"
import {InputLabel,Select,Box, MenuItem} from '@mui/material'
import { styled } from "@emotion/styled"

const boxStyle={
    width:"auto",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"baseline",
}
const textStyle={
    fontWeight:700,
    margin: 1
}
const selectStyle={
m:1,width:"223px"
}

const CustomSelect = ({label,...props}) => {

    const[field,meta]=useField(props)
    const children =props.children

    return(
    <Box sx={boxStyle} overflow={"auto"}>  
        <InputLabel sx={textStyle}>
            {label}
        </InputLabel>
        
        <Select sx={{width:"223px",color:"red"}}  {...field} placeholder="kekeasdfsdfsdfsdfsdfsdf"
        className={meta.touched && meta.error ? "input-error" : ""}>
            <MenuItem value="developer">ekkekekke</MenuItem>
        </Select>
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </Box>
    )
    }
export default CustomSelect