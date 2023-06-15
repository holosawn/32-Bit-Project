import * as React from "react"
import {
  Box,
  OutlinedInput,
  Button,
  CssBaseline,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper"
import axios from "axios"
import { useState, useEffect, useRef } from "react"
import prepareData from "./PrepareData"
import { IconButton , styled} from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import VirtualTable from "./VirtualTable"

const StyledButton = styled(Button)(({theme}) => ({
    border:"1px solid black",
    color:"black",
    margin:"0.3em",
    padding:0,
    [theme.breakpoints.up("xs")]: {
      height:"3rem",
      width:"6vh"
		},
    [theme.breakpoints.up("md")]: {
      height:"3rem",
      width:"16vh"
		},
		[theme.breakpoints.up("lg")]: {
      height:"6rem",
      width:"8.5em"
		},
		[theme.breakpoints.up("xl")]: {
      height:"6rem",
      width:"10em"
		},
}))

const DefectPage = () => {
  const [data, setData] = useState("empty");
  const [temporaryData, setTemporaryData] = useState("empty");
  const [filterValues, setFilterValues] = useState({
    formattedBodyNo: "",
    formattedAssyNo: "",
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
  }, [])
  const columns = [
    { field: "depCode", headerName: "Bildiren", width: "56px" , align : "center"},
    { field: "formattedBodyNo", headerName: "Body", width: "37px" , align:"center" },
    { field: "formattedAssyNo", headerName: "Assy", width: "30px" , align:"center" },
    { field: "vinNo", headerName: "Vin", width: 120 , align:"center" },
    { field: "colorData", headerName: "Renk", width: 35 , align:"center"},
    { field: "modelCode", headerName: "Mdl", width: 35 , align:"center"},
    { field: "termId", headerName: "Sicil", width: 40 , align:"center" },
    { field: "partName", headerName: "Parca", width: 160 , height:40 , color:"red" },
    { field: "spotCode", headerName: "Spot", width: 35 , align:"center"},
    { field: "spotgunName", headerName: "Gun", width: 50 , align:"center" },
    { field: "arcnutboltgunName", headerName: "Arc", width: 50 },
    { field: "arcnutboltCode", headerName: "ArcGun", width: 60 },
    { field: "defectName", headerName: "Hata", width: 110 },
    { field: "defrankCode", headerName: "Rank", width: 45 },
    { field: "formattedDefectHour", headerName: "Saat", width: 60 , align:"center" },
    { field: "defectType", headerName: "Hata Türü", width: 60 , align:"center"},
    { field: "defrespName", headerName: "Hata Sor", width: 60 , align:"center" },
    { field: "subResp", headerName: "Alt Sorumlu", width: 60 },
    { field: "defectReason", headerName: "NR REASONS", width:115 , align:"center" },
    { field: "kaydet", headerName: "Kaydet", width: 40 , align:"center"},
    { field: "islem", headerName: "İşlem", width: 63 },
  ]

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
  const filterData = (rows) => {
    const filterProperties = Object.keys(filterValues);
  
    if (data === "empty") return [];
  
    const filteredData =rows.filter((row) =>
      filterProperties.every((property) =>{
      return property === "colorData" ?

      !filterValues[property] ||
      row[property].colorExtCode.toString().toLowerCase().includes(filterValues[property].colorExtCode.toLowerCase())

      :!filterValues[property] ||
      row[property].toString().toLowerCase().includes(filterValues[property].toLowerCase())
    }))
  return filteredData
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
  }

  const handleMouseClick = (direction) => {
    if (tableRef.current) {
      tableRef.current.scrollBy({
        top: direction == "up" ? -64 : 64,
        behavior: "smooth",
      });
    }
  }
  const handleMouseDown = (direction) => {
    if (tableRef.current) {
      const scrollStep = direction === "up" ? -16 : 16;

      let scrollInterval = setInterval(() => {
        const newScrollTop = tableRef.current.scrollTop + scrollStep;
        tableRef.current.scrollTop = newScrollTop;
      }, 16);

      intervalRef.current = scrollInterval;
    }
  }
  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
  }


  return data === "empty" ? (
    <h1>Loading...</h1>
  ) : (
    <Paper style={{ height: "80vh", width: "100%", padding: 0, margin: 0 ,}}>
      <CssBaseline />

      <VirtualTable 
      columns={columns}
      data={temporaryData}
      setData={setData}
      removeRow={removeRow} 
      nrReasonList={data.nrReasonList}
      ref={tableRef}
      /> 
      

      <Box sx={{backgroundColor:"#9cdb9e" , display:"flex" , justifyContent:"end" , borderBlock:"1px solid black"  }}>
        <Typography sx={{marginInlineEnd:1 , fontSize:"0.7rem"}}> 
           Total Rows:{temporaryData.length}   
        </Typography>
      </Box>

      <Box sx={{display:"flex" , justifyContent:"center"}}>
        <Box sx={{display:"flex" , flexDirection:"column-reverse" , justifyContent:"center" , mr:1 }}>

          <Box sx={{display:"flex" , alignItems:"center" , margin:0 }}>
            <Typography sx={{color:"black" , width:"7em" , fontWeight:700}}>
              BODY NO
            </Typography>
              <OutlinedInput
                sx={{width:{xs:"5em" , md:"8em"}}}
                size="small"
                type="text"
                id="formattedBodyNo"
                name="formattedBodyNo"
                value={filterValues.formattedBodyNo}
                onChange={handleFilterChange}
              />
            <Button sx={{border:"1px solid black" , color:"black" , width:"6em"}} onClick={() => setTemporaryData(filterData(data.rows))}>
              ARA
            </Button>
          </Box>   

          <Box sx={{display:"flex" , alignItems:"center" , margin:0}}> 
            <Typography sx={{color:"black" , width:"7em" , fontWeight:700}}>
              MONTAJ NO
            </Typography>
              <OutlinedInput
                sx={{width:{xs:"5em" , md:"8em"}}}
                size="small"
                type="text"
                id="formattedAssyNo"
                name="formattedAssyNo"
                value={filterValues.formattedAssyNo}
                onChange={handleFilterChange}
              />
            <Button sx={{border:"1px solid black" , color:"black" , width:"6em"}} onClick={() => setTemporaryData(filterData(data.rows))}>
              ARA
            </Button>
          </Box>

        </Box>
        
        <Box sx={{display:"flex" , flexDirection:"column" , margin:1 , flexWrap:"wrap"}}>
          <Box sx={{backgroundColor:"red" , borderRadius:"0.2em" , marginBlockStart:1}}>
              <IconButton
                sx={{width:"3.5em" , height:"1.6em"}}
                color="secondary"
                onMouseDown={() => handleMouseDown("up")}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={() => handleMouseClick("up")}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
              
          </Box>
          <Box sx={{backgroundColor:"red" , borderRadius:"0.2em" , marginBlockStart:0.2}}>
            <IconButton
              sx={{width:"3.5em" , height:"1.6em" }}
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

        <Box sx={{display:"flex" , flexDirection:{xs:"column" , lg:"row"} , justifyContent:"center" }}>
          <Box sx={{flexDirection:"row"}}>
            <StyledButton>
              ARAÇ LİSTESİ
            </StyledButton>   
            <StyledButton>
              MANUAL HATA
            </StyledButton>         
            <StyledButton>
              ÇOKLU HATA
            </StyledButton>   
          </Box>
          <Box sx={{flexDirection:"row"}}>
            <StyledButton>
              HATA LİSTESİ
            </StyledButton>   
            <StyledButton>
              HATA KOPYA
            </StyledButton>   
            <StyledButton>
              ÇIKIŞ
            </StyledButton>   
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default DefectPage;
