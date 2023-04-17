
import {AppBar,Toolbar,Typography,Button } from '@mui/material';
import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../GetData';
import Box from '@mui/material/Box';
import { Formik, Form, ErrorMessage, Field ,useFormik} from "formik";
import * as yup from "yup";
import CustomInput from './Custominput';
import CustomSelect from "./CustomSelect"

const BoxStyle ={border:"1px solid #9cdb9e",boxShadow:"0",}

const advancedSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Required"),
  jobType: yup
    .string()
    .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
    .required("Required"),
  acceptedTos: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service"),
});



export default function Login(){ 

  const navigate = useNavigate()
  const handleButtonClick =() => {navigate(-1)}

  return(<>
    <Box color='secondary' sx={BoxStyle} >
        <Toolbar sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant='kazil' >CVGS(TMMT)</Typography>
        </Toolbar>
    </Box>

    <div className='form'>
  <Formik 
       initialValues={{ username: '', JobType: "", acceptedTos: false }}
       validationSchema={advancedSchema}
     >
       {props => (
         <Form onSubmit={props.handleSubmit}>
          <CustomInput 
            label="Username"
            name="username"
            type="text"
            placeholder = "Enter your username"
          />
          <CustomSelect 
          label="Job Type"
          name="JobType"
          type = "text"
          placeholder ="Select job type"
          >
            <option value="">Please select a job type</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Product Manager</option>
            <option value="other">Other</option>
          </CustomSelect>
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
     </div>
     </>
)}