
import {InputLabel, Toolbar,Typography,styled } from '@mui/material';
import './Login.css';
import Data from '../GetData';
import {React , useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,Box,Select} from "@mui/material"
import { Formik, Form,useFormik, useFormikContext, FormikContext} from "formik";
import * as yup from "yup";
import CustomInput from "./Custominput"
import CustomSelect from "./CustomSelect"
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { clear } from '@testing-library/user-event/dist/clear';

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
		month:new Date().getMonth() +1,
		day:new Date().getDate()
	},
	shift:""
}
const advancedSchema = yup.object().shape({
	terminal: yup
	  .string()
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
  
  const AdvancedForm = () => {

	const navigate = useNavigate()
	const handleNavigateClick =() => {navigate(-1)}
	const [inputs, setInputs] = useState({ });
	const [layoutName, setLayoutName] = useState("default");
	const [inputName, setInputName] = useState("default");
	const keyboard = useRef();
	const [shift,setShift] = useState(true)

	const clearingInputsOnSubmit = () => {
		setInputs({});
		Object.keys(inputs).forEach(inputName =>
		  keyboard.current.setInput("", inputName)
		);
	  };
	const onSubmit = async (values, actions) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		clearingInputsOnSubmit()
		actions.resetForm({values : initialValues})
	};

	let terminalOptions
	let ShiftOptions
	let data = Data()
		if (data && data.LoginPage ) {
		data = data.LoginPage

		terminalOptions=(data.LoginInfo.data).map(obj => {
			const{  termName} = obj 
			return termName
		})

		ShiftOptions= (data.ShiftInfo.data).map(obj => {
			const {shiftCode , rgbColor} = obj 
			return {shiftCode , rgbColor}
		})

		initialValues.terminal=terminalOptions[0]
		initialValues.shift=ShiftOptions[0].shiftCode
		}
		

	  const onChangeAll = inputs => {
			setInputs({ ...inputs });
		}
	  const handleShift = () => {
		const newLayoutName = layoutName === "default" ? "shift" : "default";
		setLayoutName(newLayoutName);
	  };
	  const onKeyPress = button => {
		if (button === "{shift}" || button === "{lock}") handleShift();
	  };

	  const onChangeInput = event => {
		const inputVal = event.target.value;
	
		setInputs(prev => ({
		  ...prev,
		  [inputName]: inputVal
		}));
	
		keyboard.current.setInput(inputVal);
	  };

	  const getInputValue = inputName => {
		return inputs[inputName] || "";
	  };

	return data== "empty" ? <h1>Loading...</h1> : (
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
			  options={terminalOptions}
			  style={mainInputStyle}
			  placeholder="Terminal"
			/>
		</Box>

		<Box sx={formBoxStyle} overflow={"auto"}>
			<InputLabel sx={labelStyle}>
            	Sicil No
        	</InputLabel>
			<CustomInput
			  name="sicil"
			  type="text"
			  value={getInputValue("sicil")}
			  onFocus={() => setInputName("sicil")}
			  extraOnChange={onChangeInput}	
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
			  type="password"value={getInputValue("password")}
			  onFocus={() => setInputName("password")}
			  extraOnChange={onChangeInput}	
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
			  value={getInputValue("montaj")}
			  onFocus={() => setInputName("montaj")}
			  extraOnChange={onChangeInput}	
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
					options={Array.from({length: new Date(initialValues.tarih.year, initialValues.tarih.month, 0).getDate()}, (_, i) => i + 1)}
					style={{...mainInputStyle,minWidth:"25px",margin:0.25}}
					/>
					<CustomSelect
					name="tarih.month"
					options={Array.from({length: 12}, (_, i) => i + 1)}
					style={{...mainInputStyle,minWidth:"25px",margin:0.25}}
					/>
					<CustomSelect
					name="tarih.year"
					options={[2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013]}
					style={{...mainInputStyle,minWidth:"25px",margin:0.25}}
					/>

					<InputLabel sx={{...labelStyle,minWidth:"25px",marginInline:1.5,marginInlineEnd:3}}>
						Shift
					</InputLabel>
					<CustomSelect
					name="shift"
					shiftChange={shift => {setShift(shift)
						}}
					options={
						ShiftOptions.map(obj => {
							const {shiftCode } = obj 
							return shiftCode 
						})}
					style={{...mainInputStyle,minWidth:"25px",margin:0.25}}
					/>
			
			</Box>
		</Box>

			<Button disabled={isSubmitting} variant='contained' type="submit">
			  Submit
			</Button>
			<Button variant='contained' onClick={handleNavigateClick}>
			  İptal
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