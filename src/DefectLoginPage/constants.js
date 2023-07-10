import {Box, Button, Typography, styled } from '@mui/material'
// Styled components
const HeaderBox =styled(Box)(() => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    height:"3.3em"
}))
const HeaderTypography =styled(Typography)(() => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"center",
    height:"3.5em",
    fontSize:"1.1em",
    fontWeight:"500"
}))
const OrdinaryBox=styled(Button)(({theme}) => ({
    color:"black",
    border:"1px black solid",
    borderRadius:"0.3rem",
    marginInline:"0.1em", 
    padding:"0px",
    flexGrow:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"3.5em",
}))
const SideBox=styled(Button)(({theme}) => ({
    color:"black",
    border:"1px black solid",
    borderRadius:"0.3rem",
    marginInline:"0.1em", 
    padding:"0px",
    flexGrow:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"3.5em",
    width: "8em",
}))
const OrdinaryTypography=styled(Typography)(({theme}) => ({
    fontWeight:"500",
    marginBlock:"1em ",
    textAlign:"center",
    margin:"0px",
    [theme.breakpoints.up("xs")]: {
        width: "6em",
        fontSize:"1em",
      },
    [theme.breakpoints.up("lg")]: {
        width: "9em",
      },
}))

//style objects
const imgBoxProps=(obj)=>({
    position: 'absolute',
    color:obj.labelColor,
    top: obj.boxY,
    left: obj.boxX,
    height:obj.boxHeight,
    width:obj.boxWidth, 
    border:`7px solid`,
    borderColor:obj.boxColor,
    display:"flex",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center",
    padding:0,
    })
const imgBoxTextStyle={
    fontSize:"0.6rem", fontWeight:"600", sx:({backgroundColor:"white",position:"absolute",width:"70px",
})}

// Styling and styled components
const labelStyle = {
    fontWeight: 700,
    fontSize: "1rem",
    whiteSpace: "normal",
    marginBlockStart: 2,
    minWidth:"8em"
  };
  
  const HeaderBoxPopperMenu = styled(Box)(({ theme }) => ({
    boxShadow: "0",
    padding: 0,
    margin: 0,
    width: "100%",
    minWidth: 350,
    maxWidth: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }));
  
  const FormBox = styled(Box)(({ theme }) => ({
    boxShadow: "0",
    marginInlineStart: { xs: 1, sm: 0 },
    width: "100%",
    minWidth: 380,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "space-around",
    alignItems: "center",
  }));
  
  const formBoxStyle = {
    marginInlineEnd: 1,
    marginInlineStart: 1,
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden"
  };
  
  const mainInputStyle = {
    width: { xs: "100%", sm: "100%", md: "70%" },
    width: "100%",
    margin: 1,
    display: "flex",
    flexGrow: 1,
    flexBasis: 0
  };
  
  const buttonBoxStyle = {
    width: "100%",
    margin: 2,
    marginBlock: 0.5,
    display: "flex",
    alignItems: "center",
  };
  
  const buttonStyle = {
    width: "100%",
    flex: 1
  };
  
  const SizeProperties = {
    width: "100%",
    maxWidth: "1000px"
  };

export {imgBoxProps, imgBoxTextStyle, SideBox, OrdinaryBox, OrdinaryTypography, HeaderBox, HeaderTypography, SizeProperties,
        buttonBoxStyle, buttonStyle, mainInputStyle, FormBox, formBoxStyle, labelStyle, HeaderBoxPopperMenu
}