import './TerminalList.css';
import React from 'react';
import Data from "../GetData"
import Box from '@mui/material/Box';
import {AppBar,Toolbar,Typography,Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';


const cellStyle ={border:"1px solid #9cdb9e",boxShadow:"0"}

const TerminalList= () => {
const navigate = useNavigate()

  let data = Data()
  if (data && data.terminalsData && data.terminalsData.data) {
    data = data.terminalsData.data
  } 
    return data ==="empty" ? <h1>EMPTY</h1>:(

      <Box sx={{bgColor:"primary" }}>
      <AppBar position='static' color='secondary'   sx={cellStyle}>
        <Toolbar >

            <Typography variant='h5' component="div" sx={{flexGrow:1,fontWeight:600}}>
              Complete Vehicle Quality
            </Typography>

            <Button href='#' sx={{ml:2}} variant='contained' color='primary' >Yardım</Button>
            <Button href='#' sx={{ml:2}} variant='contained' color='primary' >Anasayfa</Button>
            <Button href='#' sx={{ml:2}} variant='contained' color='primary' >Destek</Button>

          </Toolbar>
      </AppBar>

      <TableContainer  sx={{mt:4}}>
        <Table sx={{backgroundColor:"#c6ffc8",border:"1px solid #9cdb9e"}}  >
          
          <TableHead >
            
            <TableRow >
              <TableCell sx={{justifyContent:"center",textAlign:"center",border:"1px solid #9cdb9e"}} colSpan={100}>
                <Typography variant='kazil' sx={{textDecoration:"underline"}}>
                  Tüm Terminaller
                </Typography>
              </TableCell>
            </TableRow >
            
            <TableRow sx={{}}>
              <TableCell align='center' sx={{border:"1px solid #9cdb9e",Width:"20%"}} colSpan={1} >
                <Typography variant='kazil' >
                  Bölüm Bazında
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{border:"1px solid #9cdb9e",width:"80%"}} colSpan={100} ><Typography variant='kazil'>Filtre Bazında</Typography></TableCell>
            </TableRow>

          </TableHead>

          <TableBody>
          {data.map((row) => (

            <TableRow key={row.depName}>
              <TableCell sx={{border:"1px solid #9cdb9e",boxShadow:"0",fontSize:"1rem",color:"#d4141e"}} align='center'>
              {`(` + row.depCode + `)`}{row.depName}
              </TableCell>

              <TableCell sx={cellStyle} >
                {row.filterBaseds.map(arr => (
                
                    <Button onClick={() => navigate(`${row.depCode}/${arr.filterCode}`)} variant='outlined' align="center"  sx={{m:1, ml:0,color:"black",fontWeight:600,position:"relative",width:100}}>
                    <Typography>{arr.filterCode}</Typography>

                    {arr.linkCount > 1 ?
                    <Typography sx={{position:"absolute",top:0,right:0,pl:0.5,pr:0.5,color:"white",bgcolor:"red",borderTopRightRadius:"0.2em",borderBottomLeftRadius:"0.2em",fontSize:"0.8em",fontWeight:"700"}} >{arr.linkCount}</Typography>
                    :null}
                    
                    </Button>
                ))}
              </TableCell>

            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>

       </Box>
    )
}

export default TerminalList;
