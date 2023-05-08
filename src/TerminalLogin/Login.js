
import {InputLabel, Toolbar,Typography,styled } from '@mui/material';
import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,Box,Select} from "@mui/material"
import { Formik, Form, useFormikContext, FormikContext} from "formik";
import * as yup from "yup";
import CustomInput from "./Custominput"
import CustomSelect from "./CustomSelect"

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
	tarih: {
		year:new Date().getFullYear(),
		month:new Date().getMonth(),
		day:new Date().getDate()
	},
	shift:""
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
	.required("required"),
	tarih: yup.object().shape({
		year: yup.number().required("Yıl seçiniz"),
		month: yup.number().required("Ay seçiniz"),
		day: yup.number().required("Gün seçiniz")
	  }),
	shift:yup
	.string()
	.required()
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
	actions.resetForm({ values: initialValues })
};
  
  const AdvancedForm = () => {

	const navigate = useNavigate()
	const handleButtonClick =() => {navigate(-1)}

	return (
	<Box>
	<HeaderBox color='secondary' >
        <Toolbar sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant='kazil' >CVGS(TMMT)</Typography>
        </Toolbar>
    </HeaderBox>

	<FormBox >
	  <Formik
		initialValues={initialValues}
		validationSchema={advancedSchema}	
		onSubmit={onSubmit}
	  >
		{({ isSubmitting , initialValues}) => (
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

		<Box sx={{...formBoxStyle}} overflow={"auto"}>
			<InputLabel sx={labelStyle}>
				Tarih
			</InputLabel>
			<Box sx={{display:"flex",flexDirection:"row"}}>
					<CustomSelect
					name="tarih.day"
					isDaySelect={true}
					defaultValue={new Date().getDate()}
					options={Array.from({length: new Date(initialValues.tarih.year, initialValues.tarih.month, 0).getDate()}, (_, i) => i + 1)}
					style={{...mainInputStyle,minWidth:"25px",margin:0.25}}
					/>
					<CustomSelect
					name="tarih.month"
					defaultValue={new Date().getMonth() + 1}
					options={Array.from({length: 12}, (_, i) => i + 1)}
					style={{...mainInputStyle,minWidth:"25px",margin:0.25}}
					/>
					<CustomSelect
					name="tarih.year"
					defaultValue={new Date().getFullYear()}
					options={[2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013]}
					style={{...mainInputStyle,minWidth:"25px",margin:0.25}}
					/>

					<InputLabel sx={{...labelStyle,minWidth:"30px",marginInline:1.5,marginInlineEnd:3}}>
						Shift
					</InputLabel>
					<CustomSelect
					name="shift"
					defaultValue="M"
					options={["B","M","K"]}
					style={{...mainInputStyle,minWidth:"25px",margin:0.25}}
					/>
			
			</Box>
		</Box>

			<Button disabled={isSubmitting} variant='contained' type="submit">
			  Submit
			</Button>
		  </Form>
		)}

	  </Formik>
	</FormBox>
	
	</Box>
	);
  };
  export default AdvancedForm;