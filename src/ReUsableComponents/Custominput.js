import { useField , useFormikContext } from "formik"
import { TextField } from "@mui/material"
import { useEffect } from "react"

const outlineColor =(color) => {
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
            sx={{...style ,...(meta.touched && meta.error ? outlineColor("#ff0000") : null), backgroundColor:"white"
            }}
            color="third"
            size="small" 
            {...field} {...props}
            onChange={newOnChange}
            />
    
            
    </>
    )
}
export default CustomInput