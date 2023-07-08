import {Box, styled } from '@mui/material'

// Styled components
  const HeaderBox = styled(Box)(({ theme }) => ({
	border: "1px solid #9cdb9e",
	boxShadow: "0",
	padding: 0,
	margin: 0,
	width: "100vw",
	[theme.breakpoints.up("sm")]: {
	  width: "80vw",
	},
	[theme.breakpoints.up("md")]: {
	  width: "70vw",
	},
	minWidth: 350,
  }));
  
  const FormBox = styled(Box)(({ theme }) => ({
	border: "1px solid #9cdb9e",
	boxShadow: "0",
	width: "99vw",
	[theme.breakpoints.up("sm")]: {
	  width: "80vw",
	},
	[theme.breakpoints.up("md")]: {
	  width: "70vw",
	},
	marginInlineStart: { xs: 1, sm: 0 },
	minWidth: 380,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	alignContent: "space-around",
	alignItems: "center",
  }));

// Style properties
const labelStyle = {
	fontWeight: 700,
	fontSize: "1rem",
	whiteSpace: "normal",
	width: "%100",
	minWidth: "125px",
	marginBlockStart: 2,
};
  
const formBoxStyle={
    marginInlineEnd:1,
    marginInlineStart:1,
	width:{xs:"99vw",sm:"70vw"},
    minWidth:"312px",
    maxWidth:"500px",
    display:"flex",
    justifyContent:"space-between",
	overflow:"hidden"
}
const mainInputStyle={
	width:{xs:"%100",sm:"%100",md:"%70"},
	margin:1,
	display:"flex",
	flexGrow:1,
	flexBasis:0
}
const buttonBoxStyle={
	width:"%100",
	margin:2,
	marginBlock:0.5,
	display:"flex",
	alignItems:"center",
}
const buttonStyle={
	width: "%100",
	flex:1
}

export {HeaderBox, FormBox, labelStyle, formBoxStyle, mainInputStyle, buttonBoxStyle, buttonStyle}