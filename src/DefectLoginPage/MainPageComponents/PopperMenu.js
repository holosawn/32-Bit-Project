import {InputLabel, Typography, Container, Backdrop, Checkbox, Paper, Button, Box  } from '@mui/material';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from 'axios';
import CustomInput from '../../ReUsableComponents/Custominput';
import CustomSelect from '../../ReUsableComponents/CustomSelect';
import VirtualKeyboard from '../../ReUsableComponents/VirtualKeyboard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HeaderBoxPopperMenu, labelStyle, SizeProperties, mainInputStyle, formBoxStyle, FormBox } from '../constants';
import { DataContext } from '../DataProvider';
import { DefectLoginContext } from '../DefectLoginProvider';


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
const PopperMenu = () => {
  
  const isMediumScreen = useMediaQuery('(max-width:899px)'); // hook to see if the screen is medium size
  const {defect, defectCoords,isPopperOpen , setPopperOpen, setImgId,
     setCurrentButtons, setIsCoordSelect, setDefect, setDefectCoords, } = useContext(DefectLoginContext)
  const {data, setData} = useContext(DataContext)
  const [inputs, setInputs] = useState({});  //State to store inputs for Virtual keyboard
  const [inputName, setInputName] = useState("default");  // State to store name of the fields for Virtual keyboard
  const keyboard = useRef(); // Hook for Virtual Keyboard

  // This function handles the cancel action.
  const toCancel = () => {
    // It closes the popper and resets the defectCoords and defect states.
    setPopperOpen(false)
  };

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
    toCancel()
    handleSaveClick()
  };

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

  const handleSaveClick = ()=>{
          setImgId(data.firstButtons[0].picId)
          setCurrentButtons(data.firstButtons)
          setIsCoordSelect(false)
          setDefect({part : null, defect : null})
          setDefectCoords({x:0 , y:0})
      
    }

  return !isPopperOpen ? (
    null
  ) : (
      //{/* Main form section */}
            <Container sx={{display:"flex", justifyContent:"center", minWidth: "920px", 
            }}>
            <Backdrop open={true} sx={{ backdropFilter: 'blur(4px)', zIndex:200}} />
    <Paper
      sx={{
        backgroundColor: "#c6ffc8",
        minWidth: "920px",
        width: "90vw",
        height: "60vh",
        minHeight: "700px",
        maxHeight: "700px",
        flexDirection: "column",
        marginBlockStart: "3rem",
        display: "flex",
        justifyContent: "center",
        position: 'absolute',
        zIndex: 200,
        maxWidth: "100%",
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
                <HeaderBoxPopperMenu color="secondary">
                  <Typography
                    sx={{ marginInlineStart: 1 }}
                    fontWeight="600"
                    fontSize="1.2em"
                  >
                    CVQS(TMMT)
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
                </HeaderBoxPopperMenu>

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
                        onClick={toCancel}
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

    </Container >
);

};
  export default PopperMenu;