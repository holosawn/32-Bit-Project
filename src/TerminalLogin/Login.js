
import {AppBar,Toolbar,Typography,Button } from '@mui/material';
import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../GetData';
import Box from '@mui/material/Box';
import { Formik, Form, ErrorMessage, Field ,useFormik} from "formik";
import * as yup from "yup";




export default function Login(){ return(<Formik
       initialValues={{ name: 'jared' }}
       onSubmit={(values, actions) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
     >
       {props => (
         <Form onSubmit={props.handleSubmit}>
           <input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             value={props.values.name}
             name="name"
           />
          
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
)}