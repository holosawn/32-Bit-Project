import {InputLabel, Toolbar,Typography,styled } from '@mui/material'
import axios from 'axios'
import {React , useState , useRef , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button,Box,Container} from "@mui/material"
import { Formik, Form} from "formik"
import * as yup from "yup"
import CustomInput from '../ReUsableComponents/Custominput'
import CustomSelect from '../ReUsableComponents/CustomSelect'
import VirtualKeyboard from '../ReUsableComponents/VirtualKeyboard'
import {Alert, AlertTitle } from '@mui/material' 

// Style properties
const labelStyle = {
	fontWeight: 700,
	fontSize: "1rem",
	whiteSpace: "normal",
	width: "%100",
	minWidth: "125px",
	marginBlockStart: 2,
  };
  
  const HeaderBox = styled(Box)(({ theme }) => ({
	border: "1px solid #9cdb9e",
	boxShadow: "0",
	padding: 0,
	margin: 0,
	width: "100vw",
	[theme.breakpoints.up("sm")]: {
	  width: "80vw",
	},
	[theme.breakpoints.up("md")]: {
	  width: "70vw",
	},
	minWidth: 350,
  }));
  
  const FormBox = styled(Box)(({ theme }) => ({
	border: "1px solid #9cdb9e",
	boxShadow: "0",
	width: "99vw",
	[theme.breakpoints.up("sm")]: {
	  width: "80vw",
	},
	[theme.breakpoints.up("md")]: {
	  width: "70vw",
	},
	marginInlineStart: { xs: 1, sm: 0 },
	minWidth: 380,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	alignContent: "space-around",
	alignItems: "center",
  }));
  
// Initial values for the form fields
const initialValues = {
	terminal: "",
	sicil: "",
	password: "",
	assy: "",
	date: {
	  year: new Date().getFullYear(),
	  month: new Date().getMonth() + 1,
	  day: new Date().getDate(),
	},
	shift: "M",
  };
  // ValidationSchema for the form fields
const validationSchema = yup.object().shape({
	terminal: yup
	  .string()
	  .required(),
	sicil: yup
	  .string()
	  .min(3, "Username must be at least 3 characters long")
	  .required(),
	password:yup
	.string()
	.required(),
	montaj:yup
	.string()
	.required(),
	date: yup.object().shape({
		year: yup.number().required(),
		month: yup.number().required(),
		day: yup.number().required()
	  }),
	shift:yup
	.string()
	.required()
})
 // Style properties
const formBoxStyle={
    marginInlineEnd:1,
    marginInlineStart:1,
	width:{xs:"99vw",sm:"70vw"},
    minWidth:"312px",
    maxWidth:"500px",
    display:"flex",
    justifyContent:"space-between",
	overflow:"hidden"
}
const mainInputStyle={
	width:{xs:"%100",sm:"%100",md:"%70"},
	margin:1,
	display:"flex",
	flexGrow:1,
	flexBasis:0
}
const buttonBoxStyle={
	width:"%100",
	margin:2,
	marginBlock:0.5,
	display:"flex",
	alignItems:"center",
}
const buttonStyle={
	width: "%100",
	flex:1
}
const FormPage = () => {
	// Set the background color of the body
	document.body.style.backgroundColor = "#c6ffc8";
  
	// State variables
	const [loginError, setLoginError] = useState(); // Error state for login
	const [data, setData] = useState("empty"); // Data state
	const navigate = useNavigate(); // Navigation function
	const [inputs, setInputs] = useState({}); // State for form inputs
	const [inputName, setInputName] = useState("default"); // Current input name
	const keyboard = useRef(); // Reference to the virtual keyboard component
	const [shiftColor, setShiftColor] = useState(); // State for shift color
  
	const user = { sicil: "123", password: "123" }; // User credentials
  
	// Function to clear inputs on form submission
	const clearingInputsOnSubmit = () => {
	  setInputs({});
	  Object.keys(inputs).forEach(inputName =>
		keyboard.current.setInput("", inputName)
	  );
	};
  
	// Handle change for all inputs
	const onChangeAll = inputs => {
	  setInputs({ ...inputs });
	};
  
	// Handle change for individual input
	const onChangeInput = event => {
	  const inputVal = event.target.value;
  
	  setInputs(prev => ({
		...prev,
		[inputName]: inputVal
	  }));
  
	  keyboard.current.setInput(inputVal);
	};
  
	// Get the value of an input
	const getInputValue = inputName => {
	  return inputs[inputName] || "";
	};
  
		// Submit function
	const onSubmit = async (values, actions) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
	  
		const { password, sicil } = values;
	  
		console.log(values);
	  
		// Check if the entered password and sicil match the user credentials
		if (password === user.password && sicil === user.sicil) {
		  // Clear inputs and reset form on successful login
		  clearingInputsOnSubmit();
		  actions.resetForm({ values: initialValues });
	  
		  // Store shift information in sessionStorage
		  sessionStorage.setItem('shiftInfo', shiftColor);
	  
		  // Navigate to defectLogin page
		  navigate(`defectLogin`);
		} else {
		  // Set login error flag if credentials don't match
		  setLoginError(true);
		}
	  };
	  
		// Fetch data from the server on component mount
	  useEffect(() => {
		axios
		  .post("/login")
		  .then(() => axios.get("/user"))
		  .then((res) => {
			setData(res.data.LoginPage);
		  });
	  }, []);
	  
	  let terminalOptions;
	  let ShiftOptions;
	  
	  //Extract specified data from data
	  if (data !== "empty") {
		// Extract terminal options from the data
		terminalOptions = data.LoginInfo.data.map((obj) => {
		  const { termName } = obj;
		  return termName;
		});
	  
		// Extract shift options from the data
		ShiftOptions = data.ShiftInfo.data.map((obj) => {
		  const { shiftCode, rgbColor } = obj;
		  return { shiftCode, rgbColor };
		});
	  
		// Set initial values for terminal and shift
		initialValues.terminal = terminalOptions[0];
		initialValues.shift = ShiftOptions[0].shiftCode;
	  }
	  

	return data== "empty" ? <h1>Loading...</h1> : (
	
	<Container sx={{display:"flex",justifyContent:"center",}}>
		<Box sx={{display:"flex", flexDirection:"column" ,alignItems:"center" ,justifyContent:"center",width:{xs:"100vw",sm:"100vw",md:"70vw"}
		}}>
			{/*Renderin Header*/}
		<HeaderBox color='secondary' >
			<Toolbar sx={{display:"flex",justifyContent:"center"}}>
			<Typography variant='kazil' >CVGS(TMMT)</Typography>
			</Toolbar>

				{/*Alert component to show up when there is an error in user login*/}
				{loginError && (
				<Alert severity="error" sx={{ position: "absolute", top: 0 }}>
				  <AlertTitle>Error</AlertTitle>
				  <strong>USER NOT FOUND</strong>
				</Alert>
			  )}
		</HeaderBox>

		{/*Rendering form*/}
		<FormBox >
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}	
			onSubmit={onSubmit}
		>
			{({ isSubmitting}) => (
			<Form>

			{/*Rendering Terminal select */}
			<Box sx={formBoxStyle} overflow={"auto"}>  
				<InputLabel  sx={{...labelStyle}}>
					Terminal Listesi
				</InputLabel>
				<CustomSelect
				name="terminal"
				options={terminalOptions}
				style={mainInputStyle}
				placeholder="Terminal"
				/>
			</Box>
			
			{/*rendering Sicil input*/}
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
				{/*Rendering password input*/}
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
				{/*Rendering Assy No input*/}
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

				{/*Rendering Date Select inputs*/}
			<Box sx={{...formBoxStyle,flexDirection:{xs:"column",md:"row"},backgroundColor: shiftColor,borderRadius:1}} overflow={"auto"}>
				<Box sx={{display:"flex",flexDirection:"row"}}>
					<InputLabel sx={labelStyle}>
						Tarih
					</InputLabel>
				
						<CustomSelect
						name="date.day"
						isDaySelect={true}
						options={Array.from({length: new Date(initialValues.date.year, initialValues.date.month, 0).getDate()}, (_, i) => i + 1)}
						style={{...mainInputStyle,minWidth:"66px",margin:0.25}}
						
						/>
						<CustomSelect
						name="date.month"
						options={Array.from({length: 12}, (_, i) => i + 1)}
						style={{...mainInputStyle,minWidth:"66px",margin:0.25}}
						/>
						<CustomSelect
						name="date.year"
						options={[2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013]}
						style={{...mainInputStyle,minWidth:"85px",margin:0.25}}
						/>
				</Box>
				{/*Rendering Shift select input*/}
				<Box sx={{display:"flex",flexDirection:"row"}}>
						<InputLabel sx={{...labelStyle,
							minWidth:{xs:0,md:"25px"},
							marginInlineStart:{xs:0,md:1.35},
							marginInlineEnd:{xs:11,md:1.5},
						}}>
							Shift
						</InputLabel>
						<CustomSelect
						name="shift"
						shiftChange={shift => {setShiftColor(ShiftOptions.find(obj => obj.shiftCode == shift).rgbColor)
							}}
						options={
							ShiftOptions.map(obj => {
								const {shiftCode } = obj 
								return shiftCode 
							})}
						
						style={{...mainInputStyle,minWidth:"20px",margin:0.25}}
						/>
				</Box>
				
			</Box>
			{/*Rendering Login and Back buttons*/}
			<Box sx={buttonBoxStyle}>
				<Button sx={{...buttonStyle,backgroundColor:"#0f0f0f"}} disabled={isSubmitting} variant='contained' type="submit">
				Giriş yap
				</Button>
				<Button sx={buttonStyle} variant='contained' onClick={() => navigate(-1)}>
				Geri
				</Button>
			</Box>
			</Form>
			)}

		</Formik>
		</FormBox>

		{/*Rendering Virtual Keyboard component*/}
		<div style={{width:"100%"}}>
			<VirtualKeyboard
				keyboardRef={keyboard}
				inputName={inputName}
				onChangeAll={onChangeAll}
			/>
		</div>

		</Box>
		</Container>
		);
  };
  export default FormPage;