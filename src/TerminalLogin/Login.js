
import {MenuItem, Toolbar,Typography,styled } from '@mui/material';
import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,Box} from "@mui/material"
import { Formik, Form, ErrorMessage, Field ,useFormik} from "formik";
import * as yup from "yup";
import CustomInput from "./Custominput"
import CustomSelect from "./CustomSelect"


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
	width:"350px",
	minWidth:"180px",
	margin:1
}
const optionss=["designer","developer","manager"]
const onSubmit = async (values, actions) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	console.log(values)
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
			<CustomSelect
			  label="Terminal Listesi"
			  name="terminal"
			  options={optionss}
			  style={mainInputStyle}
			/>

			<CustomInput
			  label="Sicil No"
			  name="sicil"
			  type="text"
			  placeholder="Sicil No"
			  style={mainInputStyle}			  
			/>
			<CustomInput
			  label="Şifre"
			  name="password"
			  type="password"
			  placeholder="Şifre"	
			  style={mainInputStyle}		  
			/>
			<CustomInput
			  label="Montaj No"
			  name="montaj"
			  type="text"
			  placeholder="Montaj No"	
			  style={mainInputStyle}		  
			/>

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