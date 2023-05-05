import { Field, useField } from "formik"
import { TextField,Box, FormControl } from "@mui/material"
import InputLabel from '@mui/material/InputLabel'

const OutlineColor =(color) => {
    return {"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: color }}}       


const CustomInput = ({label,style,...props}) => {



    const[field,meta]=useField(props)

    return(
    <> 
            <TextField 
            sx={{...style ,...(meta.touched && meta.error ? OutlineColor("#ff0000") : null)
            }}
            autoComplete
            color="third"
            size="small" 
            onChange={console.log("changed")}
            {...field} {...props}
            helperText={(meta.touched && meta.error) ? `${meta.error}` : " "} 
            FormHelperTextProps={{ sx: { color: "red" } }}
            />
    
            
    </>
    )
}
export default CustomInput