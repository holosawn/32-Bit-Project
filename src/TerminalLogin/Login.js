import {AppBar,Toolbar,Typography,Button } from '@mui/material';
import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field ,useFormik} from "formik";
import * as yup from "yup";
import SelectWrapper from "./CustomSelect"
import TextfieldWrapper from './Custominput';

const opptionss={
	"0":"developer",
	"1":"berber"
}

const initialFormState={
	terminal:"",
	sicil:"",
	password:"",
	montaj:""
}
const formValidation= yup.object().shape({
	terminal: yup.string()
	.oneOf(["developer","manav","berber"])
	.required("required"),
	sicil: yup.string()
	.required("required"),
	password: yup.string()
	.required("required"),
	montaj: yup.string()
	.required("required")
})

export default function Login(){ 
	return(
	<Formik
       initialValues={{initialFormState}}
	   validationSchema={formValidation}
       onSubmit={(values, actions) => {
         console.log("submitted")
       }}
     >
		{props => (<Form>
       
		<SelectWrapper
            name="terminal"
            label="Terminal"
            options={opptionss}
        />

		<TextfieldWrapper 
		name="sicil"
		label="Sicil No"
		></TextfieldWrapper>
	   
	   <TextfieldWrapper
	   name="password"
	   label="Şifre"
	   ></TextfieldWrapper>
	   
           <button type='submit'>Submit</button>
         </Form>)}
       
     </Formik>
)}