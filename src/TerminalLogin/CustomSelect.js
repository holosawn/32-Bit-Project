import { Field, useField } from "formik"
import {Box, OutlinedInput,Select, MenuItem,FormHelperText} from '@mui/material'
import { useEffect } from "react"

const OutlineColor =(color) => {
    return {"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: color }}} 



const CustomSelect = ({options,style,...props}) => {
    
    
    const[field,meta]=useField(props)
    const children =props.children

    const tarih =Date.prototype.getFullYear

    useEffect(()=>{
        if(options.length === 1){
            props.defaultValue = options[0]
        }
        {field.onChange({
            target:{
                name:field.name,
                value:props.defaultValue}}
        )}}
        ,[])


                console.log(meta.error && meta.touched)
    return(
    <Box>
        <Select 
            variant="outlined"
            color="third"
            sx={{...style, borderColor:"secondary" , ...(meta.error && meta.touched ? OutlineColor("red") : OutlineColor("black"))}}
            size="small"
            {...field} 
        >
            {options.map((value) => {
                return <MenuItem value={value}>
                {value}
                </MenuItem>
            })}
        </Select>
        </Box>
    )
    }
export default CustomSelect