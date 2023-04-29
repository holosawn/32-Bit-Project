import { Field, useField } from "formik"
import { TextField,Box, FormControl } from "@mui/material"
import InputLabel from '@mui/material/InputLabel'

const OutlineColor =(color) => {
    return {"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: color }}}       


const CustomInput = ({label,style,...props}) => {



    const[field,meta]=useField(props)

    return(
    <Box> 
            <TextField 
            sx={{...style ,"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary",
              }}} 

            color="third"
            size="small" 
            {...field} {...props}
            helperText={meta.touched && meta.error && `${meta.error}`}
            FormHelperTextProps={{ sx: { color: "red" } }}
            />
    
            
    </Box>
    )
}
export default CustomInput