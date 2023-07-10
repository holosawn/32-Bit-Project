import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const cellStyle = {
  border: "1px solid #9cdb9e",
  boxShadow: "0",
  padding: 0,
};

const TerminalList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState("empty");

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = () => {
      axios
        .post("/login")
        .then(() => axios.get("/user"))
        .then((res) => {
          setData(res.data.terminalsData.data);
        });
    };

    // Initial data fetch
    fetchData();

    // Interval to periodically check for updated data
    const interval = setInterval(() => {
      fetchData();
    }, 2000); // Set the interval duration in milliseconds (2 seconds in this case)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Change the background color of the page
  document.body.style.backgroundColor = "#c6ffc8";

  // Function to render the content of each row in the table
  const rowContent = (rowData) => {
    // Function to render the content of each cell in a row
    const cellContent = (cellData) => (
      <Button
        onClick={() =>
          navigate(`${rowData.depCode}/${cellData.filterCode}`)
        }
        variant="outlined"
        key={cellData.filterCode}
        align="center"
        sx={{
          m: 1,
          ml: 0,
          color: "black",
          fontWeight: 600,
          position: "relative",
          width: 100,
        }}
      >
        <Typography>{cellData.filterCode}</Typography>

        {/*Rendering number of linkCounts on buttons*/}
        {cellData.linkCount > 1 ? (
          <Typography
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              pl: 0.5,
              pr: 0.5,
              color: "white",
              bgcolor: "red",
              borderTopRightRadius: "0.2em",
              borderBottomLeftRadius: "0.2em",
              fontSize: "0.8em",
              fontWeight: "700",
            }}
          >
            {cellData.linkCount}
          </Typography>
        ) : null}
      </Button>
    );

    return (
      <TableRow key={rowData.depName}>
        {/*Rendering cells of the first column which is Name of the sections*/}
        <TableCell
          sx={{
            border: "1px solid #9cdb9e",
            boxShadow: "0",
            fontSize: "1rem",
            color: "#d4141e",
          }}
          align="center"
        >
          {`(` + rowData.depCode + `)`}
          {rowData.depName}
        </TableCell>

        <TableCell sx={cellStyle}>
          {rowData.filterBaseds.map((arr) => (
            /*Rendering cells which contains buttons with functionality to navigate Login page with url parameters */
            cellContent(arr)
          ))}
        </TableCell>
      </TableRow>
    );
  };

  // Function to render the AppBar component
  const appBar = () => (
    <AppBar position="static" color="secondary" sx={cellStyle}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {t("Cvq")}
        </Typography>
        <Button href="#" sx={{ ml: 2 }} variant="contained" color="primary">
          {t("help")}
        </Button>
        <Button href="#" sx={{ ml: 2 }} variant="contained" color="primary">
          {t("mainPage")}
        </Button>
        <Button href="#" sx={{ ml: 2 }} variant="contained" color="primary">
          {t("assist")}
        </Button>
      </Toolbar>
    </AppBar>
  );

  // Function to render the TableHead component
  const tableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
        justifyContent: "center",
          textAlign: "center",
          border: "1px solid #9cdb9e",
        }}
        colSpan={100}
      >
        <Typography
          variant="kazil"
          sx={{ textDecoration: "underline" }}
        >
          {t("allTerminals")}
        </Typography>
      </TableCell>
    </TableRow>

    <TableRow sx={{}}>
      <TableCell
        align="center"
        sx={{ border: "1px solid #9cdb9e", Width: "20%" }}
        colSpan={1}
      >
        <Typography variant="kazil">{t("deptBasis")}</Typography>
      </TableCell>

      <TableCell
        align="center"
        sx={{ border: "1px solid #9cdb9e", width: "80%" }}
        colSpan={100}
      >
        <Typography variant="kazil">{t("filterBasis")}</Typography>
      </TableCell>
    </TableRow>
  </TableHead>
  );

  // Render the component
  return data === "empty" ? (
    null
  ) : (
    <Box sx={{ bgColor: "primary" }}>
      {/*Rendering AppBar */}
      {appBar()}

      {/*Rendering Table*/}
      <TableContainer sx={{ mt: 4 }}>
        <Table sx={{ backgroundColor: "#c6ffc8", border: "1px solid #9cdb9e" }}>
          {/*Rendering TableHead*/}
          {tableHead()}

          {/*Rendering TableRows*/}
          <TableBody>
            {data.map((row) => (
              rowContent(row)
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TerminalList;
