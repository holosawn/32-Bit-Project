import {
  InputLabel,
  Typography,
  styled,
  Checkbox,
  Paper
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from 'axios';
import CustomInput from '../ReUsableComponents/Custominput';
import CustomSelect from '../ReUsableComponents/CustomSelect';
import VirtualKeyboard from '../ReUsableComponents/VirtualKeyboard';
import useMediaQuery from '@mui/material/useMediaQuery';
import Backdrop from '@mui/material/Backdrop';

// Styling and styled components
const labelStyle = {
  fontWeight: 700,
  fontSize: "1rem",
  whiteSpace: "normal",
  marginBlockStart: 2
};

const HeaderBox = styled(Box)(({ theme }) => ({
  boxShadow: "0",
  padding: 0,
  margin: 0,
  width: "100%",
  minWidth: 350,
  maxWidth: 1000,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}));

const FormBox = styled(Box)(({ theme }) => ({
  boxShadow: "0",
  marginInlineStart: { xs: 1, sm: 0 },
  width: "100%",
  minWidth: 380,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignContent: "space-around",
  alignItems: "center",
}));

const formBoxStyle = {
  marginInlineEnd: 1,
  marginInlineStart: 1,
  width: "100%",
  maxWidth: "1000px",
  display: "flex",
  justifyContent: "space-between",
  overflow: "hidden"
};

const mainInputStyle = {
  width: { xs: "100%", sm: "100%", md: "70%" },
  width: "100%",
  margin: 1,
  display: "flex",
  flexGrow: 1,
  flexBasis: 0
};

const buttonBoxStyle = {
  width: "100%",
  margin: 2,
  marginBlock: 0.5,
  display: "flex",
  alignItems: "center",
};

const buttonStyle = {
  width: "100%",
  flex: 1
};

const SizeProperties = {
  width: "100%",
  maxWidth: "1000px"
};
//Initial values for the form
const initialValues = {
  defectResp: "",
  Harigami: false,
  defectType: "",
  ExitDepartment: "",
  explanation: "",
  actionTaken: "",
  minorResp: "",
  freqDefect: false,
  RDD: ""
};
//schema for the form
const advancedSchema = yup.object().shape({
  defectResp: yup.string().required("Required"),
  Harigami: yup.string().required("Required"),
  defectType: yup.string().required("Required"),
  ExitDepartment: yup.string().required("Required"),
  explanation: yup.string().required("Required"),
  actionTaken: yup.string(),
  minorResp: yup.string(),
  RDD: yup.string().required("Required")
});
//Options array to simulate options
const optionss = ["option1", "option2", "option3"];

// PopperMenu component
const PopperMenu = ({ toCancel, defect, defectCoords, toMainPage }) => {
  const isMediumScreen = useMediaQuery('(max-width:899px)'); // hook to see if the screen is medium size
  const [data, setData] = useState("empty");
  const [inputs, setInputs] = useState({});  //State to store inputs for Virtual keyboard
  const [inputName, setInputName] = useState("default");  // State to store name of the fields for Virtual keyboard
  const keyboard = useRef(); // Hook for Virtual Keyboard

  // Clearing inputs when form is submitted
  const clearingInputsOnSubmit = () => {
    setInputs({});
    Object.keys(inputs).forEach(inputName =>
      keyboard.current.setInput("", inputName)
    );
  };

  // Form submission handler
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    clearingInputsOnSubmit();
    console.log(defect, defectCoords, values);
    actions.resetForm({ values: initialValues });
    onCancel();
    toMainPage();
  };

// useEffect hook to fetch data on component mount
useEffect(() => {
  axios
    .post("/login") // Making a POST request to "/login" endpoint
    .then(() => axios.get("/user")) // Chaining a GET request to "/user" endpoint after successful login
    .then((res) => {
      setData(res.data.LoginPage); // Setting the fetched data in the state variable "data"
    });
}, []);

// onChangeAll function to update all inputs at once
const onChangeAll = (inputs) => {
  setInputs({ ...inputs });
};

// onChangeInput function to handle input change for a specific input field
const onChangeInput = (event) => {
  const inputVal = event.target.value;

  setInputs((prev) => ({
    ...prev,
    [inputName]: inputVal,
  }));

  keyboard.current.setInput(inputVal);
};

// getInputValue function to get the value of a specific input field from the state
const getInputValue = (inputName) => {
  return inputs[inputName] || "";
};

// onCancel function to handle cancellation action
const onCancel = () => {
  toCancel();
};

return data === "empty" ? (
  <h1></h1>
) : (
  <>
    {/* Main form section */}
    <Paper
      sx={{
        backgroundColor: "#c6ffc8",
        minWidth: "600px",
        width: "90vw",
        height: "60vh",
        minHeight: "700px",
        maxHeight: "700px",
        flexDirection: "column",
        marginBlockStart: "3rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormBox>
        <Formik
          initialValues={initialValues}
          validationSchema={advancedSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: "600px",
                  width: "90vw",
                  maxWidth: "1000px",
                  height: "60vh",
                  maxHeight: "440px",
                }}
              >
                {/* Header section */}
                <HeaderBox color="secondary">
                  <Typography
                    sx={{ marginInlineStart: 1 }}
                    fontWeight="600"
                    fontSize="1.2em"
                  >
                    CVGS(TMMT)
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <InputLabel sx={{ ...labelStyle, marginBlock: 0 }}>
                      Sık Gelen Hata
                    </InputLabel>
                    <Field name="freqDefect">
                      {({ field }) => (
                        <Checkbox
                          size={isMediumScreen ? "small" : "large"}
                          checked={field.value}
                          onChange={field.onChange("freqDefect")}
                          onBlur={field.onBlur}
                        />
                      )}
                    </Field>
                  </Box>
                </HeaderBox>

                {/* Form fields */}
                <Box sx={{display: "flex", ...SizeProperties, margin: 1}}>

                  <Box sx={{display: "flex", flexDirection: "column", ...SizeProperties,}}>
                  {/*Defect responsible select*/}
                    <Box sx={formBoxStyle}>
                      <InputLabel sx={{ ...labelStyle }}>
                        Hata Sorumlusu
                      </InputLabel>
                      <CustomSelect
                        name="defectResp"
                        options={optionss}
                        style={mainInputStyle}
                      />
                    </Box>
                  {/*Defet Type selec*/}
                    <Box sx={formBoxStyle}>
                      <InputLabel sx={labelStyle}>
                        Hata Sınıfı
                      </InputLabel>
                      <CustomSelect
                        name="defectType"
                        options={optionss}
                        style={mainInputStyle}
                      />
                    </Box>
                  {/*Exit Department select*/}
                    <Box sx={formBoxStyle} overflow="auto">
                      <InputLabel sx={labelStyle}>
                        Exit Department
                      </InputLabel>
                      <CustomSelect
                        name="ExitDepartment"
                        options={optionss}
                        style={mainInputStyle}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{display: "flex", flexDirection: "column", justifyContent: "center", ...SizeProperties, margin: 2, }}
                  >
                    <Box sx={{ display: "flex" }}>
                      {/*Harigami checkbox*/}
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <InputLabel
                          sx={{ ...labelStyle, marginBlock: 0 }}
                        >
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
                      {/*RDD checkbox*/}
                      <Box sx={formBoxStyle} overflow="auto">
                        <InputLabel sx={{ ...labelStyle }}>
                          RDD
                        </InputLabel>
                        <CustomSelect
                          name="RDD"
                          options={optionss}
                          style={mainInputStyle}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{width: "100%", display: "flex", justifyContent: "space-between",}}>
                        {/*Submit Button*/}
                      <Button
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ ...SizeProperties }}
                        type="submit"
                      >
                        Kaydet
                      </Button>
                      {/*Button to close PopperMenu*/}
                      <Button
                        variant="contained"
                        sx={{ ...SizeProperties }}
                        onClick={onCancel}
                      >
                        iptal
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{display: "flex", flexDirection: "column", ...SizeProperties, marginInlineEnd: 1, }}>
                    {/*Description text input*/}
                  <Box sx={formBoxStyle}>
                    <InputLabel sx={{ ...labelStyle }}>
                      Açıklama
                    </InputLabel>
                    <CustomInput
                      name="explanation"
                      type="text"
                      value={getInputValue("explanation")}
                      onFocus={() => setInputName("explanation")}
                      extraOnChange={onChangeInput}
                      style={mainInputStyle}
                      placeholder="örnek açıklama"
                    />
                  </Box>
                    {/*ActionTaken text input*/}
                  <Box sx={formBoxStyle}>
                    <InputLabel sx={{ ...labelStyle, color: "red" }}>
                      Yapılan İşlem*
                    </InputLabel>
                    <CustomInput
                      name="actionTaken"
                      type="text"
                      value={getInputValue("actionTaken")}
                      onFocus={() => setInputName("actionTaken")}
                      extraOnChange={onChangeInput}
                      style={mainInputStyle}
                    />
                  </Box>
                    {/*minorResp select*/}
                  <Box sx={formBoxStyle} overflow="auto">
                    <InputLabel sx={{ ...labelStyle, color: "red" }}>
                      Alt Sorumlu*
                    </InputLabel>
                    <CustomSelect
                      name="minorResp"
                      options={optionss}
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

      {/* Virtual keyboard component */}
      <VirtualKeyboard
        keyboardRef={keyboard}
        inputName={inputName}
        onChangeAll={onChangeAll}
      />
      
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="red">Teknik Destek</Typography>
        <Typography fontWeight="600">6.2.192-CVQSTerminal</Typography>
      </Box>
    </Paper>
  </>
);

};
  export default PopperMenu;