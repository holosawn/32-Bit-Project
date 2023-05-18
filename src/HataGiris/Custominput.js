import { Field, useField , useFormikContext } from "formik"
import { TextField,Box, FormControl } from "@mui/material"
import InputLabel from '@mui/material/InputLabel'
import { useEffect } from "react"

const OutlineColor =(color) => {
    return {"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: color }}}       


const CustomInput = ({label,extraOnChange,style,...props}) => {

  

    const[field,meta]=useField(props)
    const { setFieldValue } = useFormikContext();

    const newOnChange=(event)=>{
        setFieldValue(props.name,props.value)
        extraOnChange(event)
    }

    useEffect(() => {
        setFieldValue(props.name,props.value)
    },[props.value])
    
    return(
    <> 
            <TextField 
            sx={{...style ,...(meta.touched && meta.error ? OutlineColor("#ff0000") : null)
            }}
            autoComplete
            color="third"
            size="small" 
            {...field} {...props}
            onChange={newOnChange}
            helperText={(meta.touched && meta.error) ? `${meta.error}` : " "} 
            FormHelperTextProps={{ sx: { color: "red" } }}
            />
    
            
    </>
    )
}
export default CustomInput