import { useRef ,useState} from "react";
import * as React from "react";
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Box,Button,} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';  

const VirtualTable= ({columns , data , setData, removeRow , nrReasonList}) =>{
  const tableRef = useRef()
  const [columnSorted , setColumnSorted] = useState(() =>
  columns.reduce((obj, column) => {
    obj[column.field] = false;
    return obj;
  }, {}))
  const [temporaryData, setTemporaryData] = useState("empty")

  const [filterValues, setFilterValues] = useState({
    depCode:"",
    formattedBodyNo: "",
    formattedAssyNo: "",
    vinNo: "",
    colorData: {
      colorExtCode:""
    },
    modelCode:"",
    termId:"",
    partName:"",
    spotCode:"",
    spotgunName:"",
    arcnutboltCode:"",
    arcnutboltgunName:"",
    defectName:"",
    defRankCode:"",
    formattedDefectHour:"",
    defectType:"",
    defrespName:"",
    subResp:"",

  })

  console.log(columnSorted)
  function fixedHeaderContent() {
    return (
      <TableRow >
        {columns.map((column) => (
          <TableCell
            key={column.field}
            variant="head"
            align={"center"}
            sx={{
              backgroundColor:"#c6ffc8",
              width: column.width,
              margin:0,
              padding:0,
              fontSize:"0.75rem",
              fontWeight:"700",
              minHeight:"20px",
              height:column.height,
              borderInlineEnd:"1px #4f4f4f solid"
            }}>

            <TableSortLabel
              onClick={() => setData(prev => (
                prev.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
              ))}
              >
              {column.headerName}
            </TableSortLabel>

            
          </TableCell>
        ))}
      </TableRow>
    );
  }
  function rowContent(index, row, nrReasonList) {
    return (
      <React.Fragment key={index}>
          {columns.map((column) => (
            <TableCell
              key={column.field}
              align={column.align}
              overflow= {"hidden"}
              sx={{
                minWidth: column.width,
                border: "1px solid #4f4f4f",
                padding: 0,
                backgroundColor: row.depId == 94 ? "#c6ffc8" : "#C07F00",
                color: column.color === undefined ? "#302e2d" : column.color,
                fontSize:"0.65rem",
                fontWeight:"600",
                height:column.height
              }}
            >
            
            {(() => {
              if (column.field === "colorData") {
                return (
                  <Box
                    sx={{
                      backgroundColor: row.colorData.rgbCode,
                      borderRadius: 1,
                      fontWeight:700
                    }}
                  >
                    {row.colorData.colorExtCode}
                  </Box>
                );
              } else if (column.field === "defectReason") {
                return (
                  <select
                    defaultValue={""}
                    onChange={(e) => (row[column.field] = e.target.value)}
                    sx={{backgroundColor:"white" , 
                    width:"95%" , 
                    height:"1.5em",
                    fontSize:"0.7rem"
                    }}
                  >
                  <option value="" disabled hidden></option>
                    {nrReasonList.map((obj) => (
                      <option key={obj.nrId} value={obj.nrReasonAbb}>
                        {obj.nrReasonAbb}
                      </option>
                    ))}
                  </select>
                );
              } else if (column.field === "kaydet") {
                return<div style={{ width: "35px" , marginInlineStart:"0.2em"}}>
                <Button
                  onClick={() => console.log(row)}
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    height: "2em",
                    minWidth:"10px",
                    width:"35px",
                    padding: 0,
                    ":hover":{
                      color:"white",
                      backgroundColor:"#c4342d",
                    }
                  }}
                >
                  <SaveIcon/>
                </Button>
              </div>
              
              
              } else if (column.field === "islem") {
                return (
                  <Box sx={{ display: "flex" , justifyContent:"space-between" }}>

                    <Button
                    sx={{color:"white" , backgroundColor:"red", height:"2em",minWidth:"10px",width:"30px",
                    ":hover":{
                      color:"white",
                      backgroundColor:"#010203",
                    }}}
                    ><CreateIcon/></Button>
                    
                    <Button onClick={() => removeRow(row.id)}
                    sx={{color:"white" , backgroundColor:"red", height:"2em",minWidth:"10px",width:"30px",
                    ":hover":{
                      color:"white",
                      backgroundColor:"#010203",
                    }}}
                    ><DeleteIcon/></Button>

                  </Box>
                );
              } else {
                return row[column.field];
              }
            })()}
          </TableCell>
        ))}
      </React.Fragment>
      )

  }
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
      console.log(row)
      console.log(property)
      console.log(row.colorData.colorExtCode)
      return property === "colorData" ?

      !filterValues[property] ||
      row[property].colorExtCode.toString().toLowerCase().includes(filterValues[property].colorExtCode.toLowerCase())

      :!filterValues[property] ||
      row[property].toString().toLowerCase().includes(filterValues[property].toLowerCase())
    }))
  return filteredData
  }
  
  const scrollerRefCallback = (ref) => {
    tableRef.current = ref;
  };

  return  (
    <TableVirtuoso
    width={"100%"}
    scrollerRef={scrollerRefCallback}
    data={data}
    fixedHeaderContent={fixedHeaderContent}
    itemContent={(index, row) => rowContent(index, row, nrReasonList)}
  />
  )
}

export default VirtualTable