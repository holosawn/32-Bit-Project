import { Field, useField } from "formik"
import { TextField,Box, FormControl } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import { labelStyle } from "../Styles"
import { formBoxStyle } from "../Styles";


const CustomInput = ({label,style,...props}) => {

    const[field,meta]=useField(props)

    return(
    <Box sx={formBoxStyle}> 
            <InputLabel sx={labelStyle}>{label}</InputLabel>
            <TextField sx={style}  {...field} {...props}
            className={meta.touched && meta.error ? "input-error" : ""}
            />
    
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </Box>
    )
}
export default CustomInput