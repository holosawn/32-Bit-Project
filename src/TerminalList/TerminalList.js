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

const cellStyle = {
  border: "1px solid #9cdb9e",
  boxShadow: "0",
  padding: 0,
};

const TerminalList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("empty");

  // Getting data from server
  useEffect(() => {
    axios
      .post("/login")
      .then(() => axios.get("/user"))
      .then((res) => {
        setData(res.data.terminalsData.data);
      });
  }, []);

  // Change the background color of the page
  document.body.style.backgroundColor = "#c6ffc8";

  const rowContent = (rowData) => (

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
          <Button
            onClick={() =>
              navigate(`${rowData.depCode}/${arr.filterCode}`)
            }
            variant="outlined"
            key={arr.filterCode}
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
            <Typography>{arr.filterCode}</Typography>

            {/*Rendering number of linkCounts on buttons*/}
            {arr.linkCount > 1 ? (
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
                {arr.linkCount}
              </Typography>
            ) : null}
          </Button>
        ))}
      </TableCell>
    </TableRow>
  )

  const appBar = () => (
    <AppBar position="static" color="secondary" sx={cellStyle}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Complete Vehicle Quality
          </Typography>
          <Button href="#" sx={{ ml: 2 }} variant="contained" color="primary">
            Yardım
          </Button>
          <Button href="#" sx={{ ml: 2 }} variant="contained" color="primary">
            Anasayfa
          </Button>
          <Button href="#" sx={{ ml: 2 }} variant="contained" color="primary">
            Destek
          </Button>
        </Toolbar>
      </AppBar>
  )

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
          Tüm Terminaller
        </Typography>
      </TableCell>
    </TableRow>

    <TableRow sx={{}}>
      <TableCell
        align="center"
        sx={{ border: "1px solid #9cdb9e", Width: "20%" }}
        colSpan={1}
      >
        <Typography variant="kazil">Bölüm Bazında</Typography>
      </TableCell>

      <TableCell
        align="center"
        sx={{ border: "1px solid #9cdb9e", width: "80%" }}
        colSpan={100}
      >
        <Typography variant="kazil">Filtre Bazında</Typography>
      </TableCell>
    </TableRow>
  </TableHead>
  )
  
  return data === "empty" ? (
    <h1>Yükleniyor...</h1>
  ) : (
    <Box sx={{ bgColor: "primary" }}>

      {/*Rendering Appbar  */}
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
