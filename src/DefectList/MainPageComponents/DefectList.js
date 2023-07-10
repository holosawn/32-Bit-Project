import * as React from "react";
import { Box, OutlinedInput, Button, CssBaseline, Typography } from "@mui/material";
import { useState, useRef, useContext } from "react";
import { IconButton, styled } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { DefectDataContext } from "../DefectDataProvider";
import { StyledButton } from "../Constants";
import { useTranslation } from "react-i18next";


const DefectPage = () => {
  const navigate = useNavigate();
  const {data, setData} = useContext(DefectDataContext)
  const {initialData, setInitialData} = useContext(DefectDataContext)
  const tableRef = useContext(DefectDataContext); //hook to hols Virtual Table
  const [filterValues, setFilterValues] = useState({
    //state to store filter values
    formattedBodyNo: "",
    formattedAssyNo: "",
  });
  const intervalRef = useRef(null); // state to store interval for scroll buttons
  const { t } = useTranslation()

  // Handle the change event for filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    //changing filterValues
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Filter the data based on the filter values
  const filterData = (rows) => {
    const filterProperties = Object.keys(filterValues);

    // If data is empty, return an empty array
    if (data === "empty") return [];

    const filteredData = rows.filter((row) =>
      filterProperties.every((property) => {
        return property === "colorData"
          ? !filterValues[property] ||
              row[property].colorExtCode
                .toString()
                .toLowerCase()
                .includes(filterValues[property].colorExtCode.toLowerCase())
          : !filterValues[property] ||
              row[property]
                .toString()
                .toLowerCase()
                .includes(filterValues[property].toLowerCase());
      })
    );
    return filteredData;
  };
  
  // Remove a row from the data based on the provided rowId
  const removeRow = (rowId) => {
    setData((prevData) => {
      const updatedRows = [...prevData.rows];
      const indexOfRemove = updatedRows.findIndex((obj) => obj.id === rowId)

      updatedRows.splice(indexOfRemove, 1);
      setInitialData(filterData(updatedRows));

      return {
        ...prevData,
        rows: updatedRows,
      };
    });
  };

  // Handle the mouse click event for scrolling the table
  const handleMouseClick = (direction) => {
    if (tableRef.current) {
      tableRef.current.scrollBy({
        top: direction === "up" ? -64 : 64,
        behavior: "smooth",
      });
    }
  };

  // Handle the mouse down event for continuous scrolling of the table
  const handleMouseDown = (direction) => {
    if (tableRef.current) {
      const scrollStep = direction === "up" ? -16 : 16;

      let scrollInterval = setInterval(() => {
        const newScrollTop = tableRef.current.scrollTop + scrollStep;
        tableRef.current.scrollTop = newScrollTop;
      }, 16);

      intervalRef.current = scrollInterval;
    }
  };

  // Handle the mouse up event to stop continuous scrolling
  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
  };

  const FilterInputs= () => (

      <Box
      sx={{
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "center",
        mr: 1,
      }}
      >
        {/* Filter by Body No */}
        <Box sx={{ display: "flex", alignItems: "center", margin: 0 }}>
          <Typography sx={{ color: "black", width: "7em", fontWeight: 700 }}>
          {t("BODYNO")}
          </Typography>
          <OutlinedInput
            sx={{ width: { xs: "5em", md: "8em" } }}
            size="small"
            type="text"
            id="formattedBodyNo"
            name="formattedBodyNo"
            value={filterValues.formattedBodyNo}
            onChange={handleFilterChange}
        />
        <Button
          sx={{ border: "1px solid black", color: "black", width: "6em" }}
          onClick={() => setInitialData(filterData(data.rows))}
        >
          {t("SEARCH")}
        </Button>
      </Box>

      {/* Filter by Assy No */}
      <Box sx={{ display: "flex", alignItems: "center", margin: 0 }}>
        <Typography sx={{ color: "black", width: "7em", fontWeight: 700 }}>
          MONTAJ NO
        </Typography>
        <OutlinedInput
          sx={{ width: { xs: "5em", md: "8em" } }}
          size="small"
          type="text"
          id="formattedAssyNo"
          name="formattedAssyNo"
          value={filterValues.formattedAssyNo}
          onChange={handleFilterChange}
        />
        <Button
          sx={{ border: "1px solid black", color: "black", width: "6em" }}
          onClick={() => setInitialData(filterData(data.rows))}
        >
          {t("search")}
        </Button>
      </Box>
    </Box>
  )

  const ScrollButtons = () => (

    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      margin: 1,
      flexWrap: "wrap",
    }}
  >
    {/* Scroll Up Button */}
    <Box
      sx={{
        backgroundColor: "red",
        borderRadius: "0.2em",
        marginBlockStart: 1,
      }}
    >
      <IconButton
        sx={{ width: "3.5em", height: "1.6em" }}
        color="secondary"
        onMouseDown={() => handleMouseDown("up")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => handleMouseClick("up")}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>

    {/* Scroll Down Button */}
    <Box
      sx={{
        backgroundColor: "red",
        borderRadius: "0.2em",
        marginBlockStart: 0.2,
      }}
    >
      <IconButton
        sx={{ width: "3.5em", height: "1.6em" }}
        color="secondary"
        onMouseDown={() => handleMouseDown("down")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => handleMouseClick("down")}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  </Box>
  )

  const NavigationButtons = () => (
    
    <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      justifyContent: "center",
    }}
  >
    {/* First Row of Buttons */}
    <Box sx={{ flexDirection: "row" }}>
      <StyledButton>{t("CARLİST")}</StyledButton>
      <StyledButton>{t("MANUALDEF")}</StyledButton>
      <StyledButton>{t("MULTİPLEDEF")}</StyledButton>
    </Box>

    {/* Second Row of Buttons */}
    <Box sx={{ flexDirection: "row" }}>
      <StyledButton>{t("DEFLİST")}</StyledButton>
      <StyledButton>{t("DEFCOPY")}</StyledButton>
      <StyledButton onClick={() => navigate("/")}>{t("EXİT")}</StyledButton>
    </Box>
  </Box>
  )

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
      {FilterInputs()}

      {ScrollButtons()}

      {NavigationButtons()}

      </Box>
    </>
  );
};

export default DefectPage;
