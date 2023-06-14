import {InputLabel,Typography,styled , Checkbox , Paper} from '@mui/material'
import Data from '../GetData';
import {React , useState , useRef} from 'react';
import {Button,Box,Container} from "@mui/material"
import { Formik, Form, Field} from "formik";
import * as yup from "yup";
import CustomInput from "./Custominput"
import CustomSelect from "./CustomSelect"
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import useMediaQuery from '@mui/material/useMediaQuery';

const labelStyle={
  fontWeight:700,
  fontSize:"1rem",
  whiteSpace:"normal",
  marginBlockStart:2
}
const HeaderBox =styled(Box)(({theme}) => ({
boxShadow:"0",
padding:0,
margin:0,
width: "100%",
minWidth:350,
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}))
const FormBox =styled(Box)(({theme}) =>({
boxShadow:"0",
marginInlineStart:{xs:1,sm:0},
width:"100%",
minWidth:380,
display: "flex",
flexDirection:"column",
justifyContent:"space-around",
alignContent:"space-around",
alignItems: "center",

}))
const formBoxStyle={
  marginInlineEnd:1,
  marginInlineStart:1,
  width:"100%",
  maxWidth:"1000px",
  display:"flex",
  justifyContent:"space-between",
overflow:"hidden"
}
const mainInputStyle={
width:{xs:"100%",sm:"100%",md:"70%"},
width:"100%",
margin:1,
display:"flex",
flexGrow:1,
flexBasis:0
}
const buttonBoxStyle={
width:"100%",
margin:2,
marginBlock:0.5,
display:"flex",
alignItems:"center",
}
const buttonStyle={
width: "100%",
flex:1
}

const initialValues={ 
	HataSorumlusu:"",
  Harigami: false ,
	HataSınıfı:"",
	ExitDepartment:"",
	Açıklama:"",
	Yapılanİşlem:"",
  AltSorumlu:"",
  SıkGelenHata : false ,
  RDD :""
}
const advancedSchema = yup.object().shape({
  HataSorumlusu: yup
    .string()
    .required("required"),
  Harigami: yup
    .string()
    .required("required"),
  HataSınıfı: yup
    .string()
    .required("required"),
  ExitDepartment: yup
    .string()
    .required("required"),
  Açıklama: yup
    .string()
    .required("required"),
  Yapılanİşlem: yup
    .string(),
  AltSorumlu: yup
    .string(),
  RDD: yup
    .string()
    .required("required"),
});
  const PopperMenu = ({toCancel , defect , defectCoords , toMainPage}) => {


  const isMediumScreen = useMediaQuery('(max-width:899px)');
	const [inputs, setInputs] = useState({ });
	const [layoutName, setLayoutName] = useState("default");
	const [inputName, setInputName] = useState("default");
	const keyboard = useRef();

	const clearingInputsOnSubmit = () => {
		setInputs({});
		Object.keys(inputs).forEach(inputName =>
		  keyboard.current.setInput("", inputName)
		);
	  };

	const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    clearingInputsOnSubmit();
    console.log(defect , defectCoords , values);
    actions.resetForm({ values: initialValues });
    onCancel()
    toMainPage()
    
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

    const onCancel = () => {
      toCancel();
    }

    const optionss=["keke" ,"kkeke", "kekee"]
	return data== "empty" ? <h1>Loading...</h1> : (
	
    <Paper sx={{backgroundColor:"#c6ffc8" , minWidth:"600px" , width:"100%" , flexDirection:"column"}}>

	


    <FormBox>
        <Formik
          initialValues={initialValues}
          validationSchema={advancedSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>

      <Box sx={{display:"flex" , flexDirection:"column" , minWidth:"600px" , width:"90vw "}}>

        <HeaderBox color='secondary' >
              <Typography sx={{marginInlineStart:1}} fontWeight={"600"} fontSize={"1.2em"}>CVGS(TMMT)</Typography>

              <Box sx={{display:"flex", alignItems:"center" }}>
                    <InputLabel  sx={{...labelStyle , marginBlock:0}}>
                        Sık Gelen Hata
                    </InputLabel>

                    <Field name="SıkGelenHata">
                      {({ field }) => (
                        <Checkbox
                        size={isMediumScreen ? "small" : "large"}
                          checked={field.value}
                          onChange={field.onChange("SıkGelenHata")}
                          onBlur={field.onBlur}
                        />
                      )}
                    </Field>
              </Box>

        </HeaderBox>

        <Box sx={{display:"flex" , width:"100%" , margin:1}}>

          <Box sx={{display:"flex" , flexDirection:"column" , width:"100%"}}>
            <Box sx={formBoxStyle} overflow={"auto"}>  
              <InputLabel  sx={{...labelStyle}}>
                Hata Sorumlusu
              </InputLabel>
              <CustomSelect
              name="HataSorumlusu"
              options={optionss}
              style={mainInputStyle}
              />
            </Box>

            <Box sx={formBoxStyle} overflow={"auto"}>
              <InputLabel sx={labelStyle}>
                Hata Sınıfı
              </InputLabel>
              <CustomSelect
              name="HataSınıfı"
              options={["keke", "keke"]}
              style={mainInputStyle}		
                
              />
            </Box>

            <Box sx={formBoxStyle} overflow={"auto"}>
              <InputLabel sx={labelStyle}>
                Exit Department
              </InputLabel>
              <CustomSelect
              name="ExitDepartment"
              options={["keke", "keke"]}
              style={mainInputStyle}		  
              />
            </Box>

          </Box>


          <Box sx={{display:"flex" , flexDirection:"column", justifyContent:"center" , width:"100%" , margin:2}}>
              <Box sx={{display:"flex"}}>

                <Box sx={{display:"flex", alignItems:"center"}}> 
                      <InputLabel  sx={{...labelStyle , marginBlock:0}}>
                        Harigami
                      </InputLabel>
                  <Field name="Harigami">
                    {({ field }) => (
                      <Checkbox
                      size={isMediumScreen ? "small" : "large"}
                        checked={field.value}
                        onChange={field.onChange("Harigami")}
                        onBlur={field.onBlur}
                      />
                    )}
                  </Field>

                </Box>

                  <Box sx={formBoxStyle} overflow={"auto"}>  
                      <InputLabel  sx={{...labelStyle}}>
                        RDD
                      </InputLabel>
                      <CustomSelect
                      name="RDD"
                      options={["keke", "keke"]}
                      style={mainInputStyle}
                      />
                  </Box>

              </Box>
              
              <Box sx={{width:"%100" , display:"flex" , justifyContent:"space-between"}}>
                <Button variant='contained' disabled={isSubmitting} sx={{width:"100%"}} type="submit" >Kaydet</Button>
                <Button variant='contained' sx={{width:"100%"}} onClick={onCancel} >iptal</Button>

              </Box>
          </Box>

        </Box>

        <Box sx={{display:"flex" , flexDirection:"column" , width:"100%" , marginInlineEnd:1}}>

            <Box sx={formBoxStyle} >  
              <InputLabel  sx={{...labelStyle}}>
                Açıklama
              </InputLabel>
              <CustomInput
              name="Açıklama"
              type="text"
              value={getInputValue("Açıklama")}
              onFocus={() => setInputName("Açıklama")}
              extraOnChange={onChangeInput}	
              style={mainInputStyle}
              placeholder="örnek açıklama"
              />
            </Box>

            <Box sx={formBoxStyle}>  
              <InputLabel  sx={{...labelStyle, color:"red"}}>
                Yapılan İşlem*
              </InputLabel>
              <CustomInput
              name="Yapılanİşlem"
              type="text"
              value={getInputValue("Yapılanİşlem")}
              onFocus={() => setInputName("Yapılanİşlem")}
              extraOnChange={onChangeInput}	
              style={mainInputStyle}
              />
            </Box>

            <Box sx={formBoxStyle} overflow={"auto"}>
              <InputLabel sx={{...labelStyle, color:"red"}}>
                Alt Sorumlu*
              </InputLabel>
              <CustomSelect
              name="AltSorumlu"
              options={["keke", "keke"]}
              style={mainInputStyle}		  
              isOptional={true}
              />
            </Box>
        </Box>

      </Box>
        </Form>
          )}
        </Formik>
      </FormBox>
      
        <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        inputName={inputName}
        layoutName={layoutName}
        onChangeAll={onChangeAll}
        onKeyPress={onKeyPress}
        />
        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
          <Typography color={"red"}>Teknik Destek</Typography>
          <Typography fontWeight={"600"}>6.2.192-CVQSTerminal</Typography>
        </Box>
    </Paper>
  );
};
  export default PopperMenu;