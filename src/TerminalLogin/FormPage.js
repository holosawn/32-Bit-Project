import { Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { React, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import VirtualKeyboard from "../ReUsableComponents/VirtualKeyboard";
import { Alert, AlertTitle } from "@mui/material";
import { HeaderBox } from "./constants";
import LoginForm from "./LoginForm";
import { useTranslation } from "react-i18next";

const FormPage = () => {
  // Set the background color of the body
  document.body.style.backgroundColor = "#c6ffc8";
  const { t } = useTranslation();

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
    Object.keys(inputs).forEach((inputName) =>
      keyboard.current.setInput("", inputName)
    );
  };

  // Handle change for all inputs
  const onChangeAll = (inputs) => {
    setInputs({ ...inputs });
  };

  // Handle change for individual input
  const onChangeInput = (event) => {
    const input = event.target;

    setInputs((prev) => ({
      ...prev,
      [inputName]: input.value,
    }));

    keyboard.current.setInput(input.value);
  };

  // Get the value of an input
  const getInputValue = (inputName) => {
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
      actions.resetForm();

      // Store shift information in sessionStorage
      sessionStorage.setItem("shiftInfo", shiftColor);

      // Navigate to defectLogin page
      navigate("defectLogin");
    } else {
      // Set login error flag if credentials don't match
      setLoginError(true);
    }
  };

  // Fetch data from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await axios.post("/login");
        await axios.get("/user").then((res) => {
          setData(res.data.LoginPage);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  let terminalOptions = [];
  let ShiftOptions = [];

  // Extract specified data from data
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
  }

  return data === "empty" ? (
    <h1>...</h1>
  ) : (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100vw", sm: "100vw", md: "70vw" },
        }}
      >
        {/* Render the header */}
        <HeaderBox color="secondary">
          <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="kazil">CVGS(TMMT)</Typography>
          </Toolbar>

          {/* Render the login error alert */}
          {loginError && (
            <Alert severity="error" sx={{ position: "absolute", top: 0 }}>
              <AlertTitle>{t("error")}</AlertTitle>
              <strong>{t("userNotFound")}</strong>
            </Alert>
          )}
        </HeaderBox>

        {/* Render the login form */}
        <LoginForm
          onSubmit={onSubmit}
          getInputValue={getInputValue}
          setInputName={setInputName}
          onChangeInput={onChangeInput}
          terminalOptions={terminalOptions}
          setShiftColor={setShiftColor}
          ShiftOptions={ShiftOptions}
          shiftColor={shiftColor}
        />

        {/* Render the virtual keyboard */}
        <div style={{ width: "100%" }}>
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
