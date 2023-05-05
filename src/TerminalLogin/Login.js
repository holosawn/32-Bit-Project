
import {InputLabel, Toolbar,Typography,styled ,TextField, FormControl} from '@mui/material';
import './Login.css';
import {React, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,Box,Select} from "@mui/material"
import { Formik, Form} from "formik";
import * as yup from "yup";
import CustomInput from "./Custominput"
import CustomSelect from "./CustomSelect"
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const labelStyle={
    fontWeight:700,
    whiteSpace:"normal",
    width:"%100",
    minWidth:"125px",
    marginBlockStart:2
}
const HeaderBox =styled(Box)(({theme}) => ({
	border:"1px solid #9cdb9e",
	boxShadow:"0",
	width:"70vw",
	minWidth:350,

}))
const FormBox =styled(Box)(({theme}) =>({
	border:"1px solid #9cdb9e",
	boxShadow:"0",
	width:"70vw",
	minWidth:380,
	display: "flex",
	flexDirection:"column",
	justifyContent:"space-around",
	alignContent:"space-around",
	alignItems: "center",
	
}))
const initialValues={ 
	terminal:"",
	sicil:"",
	password:"",
	montaj:"",
}
const advancedSchema = yup.object().shape({
	terminal: yup
	  .string()
	  .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
	  .required("Required"),
	sicil: yup
	  .string()
	  .min(3, "Username must be at least 3 characters long")
	  .required("Required"),
	password:yup
	.string()
	.required("required"),
	montaj:yup
	.string()
	.required("required")
});
const formBoxStyle={
    marginInlineEnd:2,
    width:"50vw",
    minWidth:"363px",
    maxWidth:"470px",
    display:"flex",
    justifyContent:"space-between",
	overflow:"hidden"
}
const mainInputStyle={
	minWidth:"223px",
	margin:1,
	display:"flex",
	flexGrow:1,
	flexBasis:0
	}
	
const optionss=["developer","designer","manager","student","ak","kızıl","cult","developer","designer","manager","student","ak","kızıl","cult","developer","designer","manager","student","ak","kızıl","cult","designer","manager","student","ak","kızıl","cult","developer","designer","manager","student","ak","kızıl","cult","developer","designer","manager","student","ak","kızıl","cult","designer","manager","student","ak","kızıl","cult","developer","designer","manager","student","ak","kızıl","cult","developer","designer","manager","student","ak","kızıl","cult"]
const onSubmit = async (values, actions) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	console.log(values)
	actions.resetForm()
};
  
  const AdvancedForm = () => {

	const navigate = useNavigate()
	const handleButtonClick =() => {navigate(-1)}
	const [inputs, setInputs] = useState({});
	const [layoutName, setLayoutName] = useState("default");
	const [inputName, setInputName] = useState("default");
	const keyboard = useRef();
  
	 const onChangeAll = inputs => {
    setInputs({ ...inputs });
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onKeyPress = button => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal
    });

    keyboard.current.setInput(inputVal);
  };

  const getInputValue = inputName => {
    return inputs[inputName] || "";
  };


	return (
	<Box>
	<HeaderBox color='secondary' >
        <Toolbar sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant='kazil' >CVGS(TMMT)</Typography>
        </Toolbar>
    </HeaderBox>

	<FormBox >
	  <Formik
		initialValues={{ terminal:"",sicil:"",password:"",montaj:""}}
		validationSchema={advancedSchema}
		onSubmit={onSubmit}
	  >
		{({ isSubmitting }) => (
		  <Form >

		<Box sx={formBoxStyle} overflow={"auto"}>  
			<InputLabel  sx={{...labelStyle}}>
            	Terminal
        	</InputLabel>
			<CustomSelect
			  name="terminal"
			  options={optionss}
			  style={mainInputStyle}
			/>
		</Box>

		<Box sx={formBoxStyle} overflow={"auto"}>
			<InputLabel sx={labelStyle}>
            	Sicil No
        	</InputLabel>
			<CustomInput
			  name="sicil"
			  type="text"
			  placeholder="Sicil No"
			  style={mainInputStyle}	
			  value={getInputValue("sicil")}
			  onFocus={() => setInputName("sicil")}
			  onChange={onChangeInput}		  
			/>
		</Box>

		<Box sx={formBoxStyle} overflow={"auto"}>
			<InputLabel sx={labelStyle}>
            	Şifre
        	</InputLabel>
			<CustomInput
			  name="password"
			  type="password"
			  placeholder="şifre"	
			  style={mainInputStyle}		  
			  value={getInputValue("password")}
			  onFocus={() => setInputName("password")}
			  onChange={onChangeInput}
			/>
		</Box>

		<Box sx={formBoxStyle} overflow={"auto"}>
			<InputLabel sx={labelStyle}>
            	Montaj No
        	</InputLabel>
			<CustomInput
			  id="montaj"
			  name="montaj"
			  type="text"
			  placeholder="montaj"	
			  style={mainInputStyle}		  
			  value={getInputValue("montaj")}
			  onFocus={() => setInputName("montaj")}
			  onChange={onChangeInput}
			/>
		</Box>

		<Box sx={formBoxStyle} overflow={"auto"}>
			<InputLabel sx={labelStyle}>
				Tarih
			</InputLabel>
			<Box>
				
			</Box>
		</Box>

			<Button disabled={isSubmitting} variant='contained' type="submit">
			  Submit
			</Button>
		  </Form>
		)}

	  </Formik>
	</FormBox>

      <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          inputName={inputName}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
      />
	</Box>
	);
  };
  export default AdvancedForm;