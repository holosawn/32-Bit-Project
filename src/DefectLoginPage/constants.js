import {Box, Button, Typography, styled } from '@mui/material'

  //Initialize cursor image
export const CustomCursor = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABZhJREFUWEe1l39sU1UUx8/t69aN0a3t2m7t+uNtKwxkyIBCzCTmVfnDRIwMQQjuj9VoYmJU9p9REob6h4mJ7j9M+GM1IAtZlP6hxij4asCADtmDpoPZbu3a7mdZ97qt69af5r7Xlg3fWAejyel9ee/2ns/5nnPPfUUg8GlquyTDtxlbCyv0fD3vIaHFzG09lKK89NL0zLyl1/YGs54OH15LGKC1h/r4vefpS78NgGvofvst25HOpwUhCNDU2k21HjHTgbEISADg8nWfLY2I9qeREmGAY93Ua4d20dd6faCWb4DtpBx+driZuXjCyqxzSlYEeOmVHfQ/fcMgEomgRCKGF3Zo4SYTZD3+sJU5f9S+XikRBGg81k1Z9m+jGWeAAxCJECCEoKlBBZmFBNA3fJ3Md0fb1wNCGODwOar5xW20yzUCSIQ4CH5EoJKXwjajAn79w+2IJlHLk9bFigDmfQ30wN0xQATinHMACIMASIrF8OIeA9DXBtmJyaiFufD4W1UY4OA56tnmetrz73g+eg4CZWHwiAD2NGogEo7CTSbQznQff6ytKgiw5eA5qnE3SfsGJ7LR8yngAYAfMQECqFFLwaSTgePaoG0+PNPO2K1r6p7CAAe6qE07STroDfEFmLOcYw6GB8EQkiIxNO/SQV9fkBkeZa39PW8W3D1XBDBs1dJB9xjgkHPRY6989IC9Y9/8mF1l7049pFJp9u/egNX5/fGCtqoggOnlLkrfoKL9/X5AnOa8cRHDA/lzAJiEw0EABr0CjEYF3HGNdv717ZFVt+oKAGcpTb2aHhkYBoSIrPMsBOdIxLWAXAp4ME4M7ksiEYN5txGCI6xjIhBqeVRdrABwhlIbq+gxNwbAkS+H4GUXgaxSCgq1FAjcrAgREATironsdZ1RAYOeSdbp9Fv67VbBuhAG2P81pSBr6JBnOFsDOYAlIICgZEMJGBs04HYGGYTQg+rnssGrlP8QKes9u9VX0HFMUl9SSqOODnm9XPRIJADAKSOC+kYjjPrDDmfPccvjtGZBBch9n1FyYy09NTy0DEBWXQXFpRK475/MF6e4SAzaeg0E3OMWzy/vONYKIQig23eSUmhN9HRwMA8g1+khFpljy+QVsoXZeViIxgCAV6G6VgNsKOJw2d9aswrCAM99RFVoTXRk1MMBVGiNsDAzwyYTixaCkHxYadS3hbyB/O4gxEWg22wAf7+nZfBKe0H7P6eUMID5BCXVbqVnxtwgrSJhcTYMyXi8JXD9cztJdZBlMnVfMpGSLUZj+VSoDBqIzUR9zh/erl1LGgQBqpvepco12+l0agHicyFIJeLWkd6vbLmFDc0nOxSk6dR0AB/XfIFiFTQmPQRdA1bf1U/yc1eDEQZobKXKDRQdnbwDqWTMOs6cXbYg2XRCJtHqvYgolsWmWQD8voAIKFcpIRGb89396UTBKggCKLccpkTiMjqTTlhD/RcEo9GaP+hQ1u04xQazvSLbrNR1BhgbcJ0O3viiY7Xoue4pNElpOkBlkJiccttXlBKrABtLvcUblbJYJJzvllKVGjKpGDsfCNT6mM5Vj2ZBgELI8RzV9rY2VZ25a3ZyFDKZTL4gqxu2QKDv6ulx5ptVVXgiAAxRs/d9b5mCJKNTo7wK+C1aKgOE4uzs5NDOccb2v/a7NMAnBqjc9GqbnGzuirEhyGTS+VQoazdD8PZl29S9i9ZHKVoIwNI5uevMkkUzlQ2veyt0ZjIWDgIh2QDlVbWQTs7C1NAtR+juxUd2R7wgPrYIABADQFHWipdc43v4ObbcEYcB0gCQxFamfGavauuh80SxlHM8N9H/ZzzKfhoJ/H4lO28p8DJBMAB2hg3/DcRW8tCYe54Dwb9JZZ3HAQDbYnlN8xlRUWl1PHq/Yz50+0d8L2uJ7HzBTPwHfHX0MCAyHPYAAAAASUVORK5CYII="

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
    height:"4em",
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