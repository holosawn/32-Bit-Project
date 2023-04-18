import { Field, useField } from "formik"
import {InputLabel,NativeSelect,Box, OutlinedInput} from '@mui/material'
import { useEffect } from "react"
import { labelStyle } from "../Styles"
import { formBoxStyle } from "../Styles"


const selectStyle={
m:1,width:"223px"
}

const CustomSelect = ({label,options,style,...props}) => {
    
    const[field,meta]=useField(props)
    const children =props.children

    useEffect(()=>{
        field.onChange({
            target:{
                name:field.name,
                value:options[0]
            }
        })}
        ,[])
        console.log(style)

    return(
    <Box sx={formBoxStyle} overflow={"auto"}>  
        <InputLabel sx={labelStyle}>
            {label}
        </InputLabel>
        
        <NativeSelect 
        sx={style}
        input={<OutlinedInput/>}
        {...field} 
        className={meta.touched && meta.error ? "input-error" : ""}>
            {options.map((value) => {
                return <option value={value}>
                {value}
                </option>
            })}
        </NativeSelect>
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </Box>
    )
    }
export default CustomSelect