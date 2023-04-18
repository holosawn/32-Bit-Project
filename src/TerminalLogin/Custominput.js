import { FiveK } from "@mui/icons-material"
import { Field, useField } from "formik"
import { TextField,Box, FormControl } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import { alignProperty } from "@mui/material/styles/cssUtils";

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

const CustomInput = ({label,...props}) => {

    const[field,meta]=useField(props)

    return(
    <Box sx={boxStyle}> 
            <InputLabel sx={textStyle}  >{label}</InputLabel>
            <TextField sx={{m:1,width:"%100"}}  {...field} {...props}
            className={meta.touched && meta.error ? "input-error" : ""}
            />
    
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </Box>
    )
}
export default CustomInput