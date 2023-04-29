
import {InputLabel, Toolbar,Typography,styled } from '@mui/material';
import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,Box,Select} from "@mui/material"
import { Formik, Form} from "formik";
import * as yup from "yup";
import CustomInput from "./Custominput"
import CustomSelect from "./CustomSelect"
import { formBoxStyle } from "../Styles"
import { labelStyle } from "../Styles"
import { BorderColor } from '@mui/icons-material';

const HeaderBox =styled(Box)(({theme}) => ({
	border:"1px solid #9cdb9e",
	boxShadow:"0",
	width:"70vw",
	minWidth:350,

}))
const FormBox =styled(Box)(({theme}) =>({
	border:"1px solid #9cdb9e",
	boxShadow:"0",
	width:"50vw",
	minWidth:325,
	display: "flex",
	flexDirection:"column",
	justifyContent:"space-around",
	alignContent:"space-around"
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
const mainInputStyle={
	width:"auto",
	minWidth:"223px",
	margin:1,
	}

	
const optionss=["developer","designer","manager"]
const onSubmit = async (values, actions) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	console.log(values)
	actions.resetForm()
};
  
  const AdvancedForm = () => {

	const navigate = useNavigate()
	const handleButtonClick =() => {navigate(-1)}
	return (
	<>
	<HeaderBox color='secondary' >
        <Toolbar sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant='kazil' >CVGS(TMMT)</Typography>
        </Toolbar>
    </HeaderBox>

	<FormBox>
	  <Formik
		initialValues={{ terminal:"",sicil:"",password:"",montaj:""}}
		validationSchema={advancedSchema}
		onSubmit={onSubmit}
	  >
		{({ isSubmitting }) => (
		  <Form>

		<Box sx={formBoxStyle} overflow={"auto"}>  
			<InputLabel  sx={labelStyle}>
            	Terminal Listesi
        	</InputLabel>
			<CustomSelect
			  name="terminal"
			  options={optionss}
			  style={mainInputStyle}
			  defaultValue={optionss[0]}
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
			/>
		</Box>

		<Box sx={formBoxStyle} overflow={"auto"}>
			<InputLabel sx={labelStyle}>
            	Şifre
        	</InputLabel>
			<CustomInput
			  name="password"
			  type="password"
			  placeholder="Şifre"	
			  style={mainInputStyle}		  
			/>
		</Box>

		<Box sx={formBoxStyle} overflow={"auto"}>
			<InputLabel sx={labelStyle}>
            	Montaj No
        	</InputLabel>
			<CustomInput
			  name="montaj"
			  type="text"
			  placeholder="Montaj No"	
			  style={mainInputStyle}		  
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
	
	</>
	);
  };
  export default AdvancedForm;