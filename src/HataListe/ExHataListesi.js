import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Box } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import axios from 'axios';
import {useState , useEffect} from "react"
import prepareData from "./PrepareData"

const HataListesi = () => {

    const [data , setData] = useState("empty")

    useEffect(() => {
        axios.post("/login")
          .then(() => axios.get("/user"))
          .then(res => {setData(prepareData(res.data.ErrorsData.data[0]))})
       
        }, [])

    console.log(data)   

      
      const columns = [
        { field: 'depCode', headerName: 'Bildiren', width: 100 },
        { field: 'bodyNo', headerName: 'Body', width: 100 },
        { field: 'assyNo', headerName: 'Assy', width: 100 },
        { field: 'vinNo', headerName: 'Vin', width: 200 },
        { field: 'colorData', headerName: 'Renk', width: 100 },
        { field: 'modelCode', headerName: 'Mdl', width: 100 },
        { field: 'termId', headerName: 'Sicil', width: 100 },
        { field: 'partName', headerName: 'Parca', width: 100 },
        { field: 'spotCode', headerName: 'Spot', width: 100 },
        { field: 'spotgunName', headerName: 'Gun', width: 100 },
        { field: 'arcnutboltgunName', headerName: 'Arc', width: 100 },
        { field: 'arcnutboltCode', headerName: 'ArcGun', width: 100 },
        { field: 'defectName', headerName: 'Hata', width: 100 },
        { field: 'defrankCode', headerName: 'Rank', width: 100 },
        { field: 'formattedDefectHour', headerName: 'Saat', width: 100 },
        { field: 'defectType', headerName: 'Hata Türü', width: 100 },
        { field: 'defrespName', headerName: 'Hata Sor', width: 100 },
    ];

      

      const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
          <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
          <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead,
        TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
      };
      
      function fixedHeaderContent() {
        return (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                variant="head"
                align={column.numeric || false ? 'right' : 'left'}
                style={{ width: column.width }}
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        );
      }

      
      function rowContent(index, row) {
        console.log(index , row)
        return (
          <React.Fragment key={index}>
            {columns.map(column => (
                <TableCell key={column.field} align="center" style={{ minWidth: column.width }}>
                    {column.field === 'colorData' ? (
                        <Box sx={{ backgroundColor: row.colorData.rgbCode, borderRadius: 1 }}>
                            {row.colorData.colorExtCode}
                        </Box>
                    ) : (
                            row[column.field]
                        )}
                </TableCell>
            ))}
          </React.Fragment>
        );
      }
      

      return data=="empty" ? <h1>Loading...</h1>
      :(
        <Paper style={{ height: 400, width: '100%' }}>
        <TableVirtuoso
          data={data}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
      )
    }

export default HataListesi