import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {
  Box,
  InputLabel,
  TextField,
  Input,
  Select,
  MenuItem,
  Button,
  CssBaseline,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import prepareData from "./PrepareData";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { UpdateTwoTone } from "@mui/icons-material";

const HataListesi = () => {
  document.body.style.backgroundColor = "#c6ffc8";
  const [data, setData] = useState("empty");
  const [temporaryData, setTemporaryData] = useState("empty");
  const [filterValues, setFilterValues] = useState({
    filterProperty1: "",
    filterProperty2: "",
  });
  const intervalRef = useRef(null);
  const tableRef = useRef();

  useEffect(() => {
    axios
      .post("/login")
      .then(() => axios.get("/user"))
      .then((res) => {
        const temp = prepareData(res.data.ErrorsData.data[0]);
        setData(temp);
        setTemporaryData(temp.rows);
      });
  }, []);

  const columns = [
    { field: "depCode", headerName: "Bildiren", width: 100 },
    { field: "formattedBodyNo", headerName: "Body", width: 100 },
    { field: "formattedAssyNo", headerName: "Assy", width: 100 },
    { field: "vinNo", headerName: "Vin", width: 200 },
    { field: "colorData", headerName: "Renk", width: 100 },
    { field: "modelCode", headerName: "Mdl", width: 100 },
    { field: "termId", headerName: "Sicil", width: 100 },
    { field: "partName", headerName: "Parca", width: 100 },
    { field: "spotCode", headerName: "Spot", width: 100 },
    { field: "spotgunName", headerName: "Gun", width: 100 },
    { field: "arcnutboltgunName", headerName: "Arc", width: 100 },
    { field: "arcnutboltCode", headerName: "ArcGun", width: 100 },
    { field: "defectName", headerName: "Hata", width: 100 },
    { field: "defrankCode", headerName: "Rank", width: 100 },
    { field: "formattedDefectHour", headerName: "Saat", width: 100 },
    { field: "defectType", headerName: "Hata Türü", width: 100 },
    { field: "defrespName", headerName: "Hata Sor", width: 100 },
    { field: "altSorumlu", headerName: "Alt Sorumlu", width: 100 },
    { field: "nrReasons", headerName: "NR REASONS", width: 100 },
    { field: "kaydet", headerName: "Kaydet", width: 100 },
    { field: "islem", headerName: "İşlem", width: 100 },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setTemporaryData(filterData(data.rows));
  }, [filterValues]);

  const filterData = (rows) => {
    const { filterProperty1, filterProperty2 } = filterValues;

    if (data === "empty") return [];

    const filteredData = rows.filter(
      (row) =>
        (!filterProperty1 ||
          row.formattedBodyNo
            .toLowerCase()
            .includes(filterProperty1.toLowerCase())) &&
        (!filterProperty2 ||
          row.formattedAssyNo
            .toLowerCase()
            .includes(filterProperty2.toLowerCase()))
    );

    return filteredData;
  };

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.headerName}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  const removeRow = (rowId) => {
    setData((prevData) => {
      const updatedRows = [...prevData.rows];
      const indexOfRemove = updatedRows.findIndex((obj) => obj.id === rowId);

      updatedRows.splice(indexOfRemove, 1);
      setTemporaryData(filterData(updatedRows));

      return {
        ...prevData,
        rows: updatedRows,
      };
    });
  };

  function rowContent(index, row, nrReasonList) {
    return (
      <React.Fragment key={index}>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            align="center"
            style={{
              minWidth: column.width,
              border: "1px solid #ccc",
              padding: "8px",
            }}
          >
            {(() => {
              if (column.field === "colorData") {
                return (
                  <Box
                    sx={{
                      backgroundColor: row.colorData.rgbCode,
                      borderRadius: 1,
                    }}
                  >
                    {row.colorData.colorExtCode}
                  </Box>
                );
              } else if (column.field === "nrReasons") {
                return (
                  <Select
                    defaultValue={row[column.field] || ""}
                    onChange={(e) => (row.defectReason = e.target.value)}
                  >
                    {nrReasonList.map((obj) => (
                      <MenuItem key={obj.nrId} value={obj.nrReasonAbb}>
                        {obj.nrReasonAbb}
                      </MenuItem>
                    ))}
                  </Select>
                );
              } else if (column.field === "kaydet") {
                return <Button onClick={() => console.log(row)}>Kaydet</Button>;
              } else if (column.field === "islem") {
                return (
                  <Box sx={{ display: "flex" }}>
                    <Button>İşle</Button>
                    <Button onClick={() => removeRow(row.id)}>Sil</Button>
                  </Box>
                );
              } else {
                return row[column.field];
              }
            })()}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const handleMouseClick = (direction) => {
    if (tableRef.current) {
      tableRef.current.scrollBy({
        top: direction == "up" ? -64 : 64,
        behavior: "smooth",
      });
    }
  };
  const scrollerRefCallback = (ref) => {
    tableRef.current = ref;
  };

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

  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
  };

  return data === "empty" ? (
    <h1>Loading...</h1>
  ) : (
    <Paper style={{ height: "80vh", width: "100%", padding: 0, margin: 0 }}>
      <CssBaseline />

      <TableVirtuoso
        width={"100%"}
        scrollerRef={scrollerRefCallback}
        data={temporaryData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(index, row) => rowContent(index, row, data.nrReasonList)}
      />
      <Box sx={{display:"flex"}}>
        <Box sx={{display:"flex" , flexDirection:"column"}}>
          <Box> 
            <Box>
              <InputLabel htmlFor="BODY NO">Özellik 1:</InputLabel>
              <Input
                type="text"
                id="filterProperty1"
                name="filterProperty1"
                value={filterValues.filterProperty1}
                onChange={handleFilterChange}
              />
            </Box>
          <Box>       
            
          </Box>
            <Box>
              <InputLabel htmlFor="MONTAJ NO">Özellik 2:</InputLabel>
              <Input
                type="text"
                id="filterProperty2"
                name="filterProperty2"
                value={filterValues.filterProperty2}
                onChange={handleFilterChange}
              />
            </Box>
          </Box>
        </Box>
        <IconButton
          onMouseDown={() => handleMouseDown("up")}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => handleMouseClick("up")}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton
          onMouseDown={() => handleMouseDown("down")}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => handleMouseClick("down")}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default HataListesi;
