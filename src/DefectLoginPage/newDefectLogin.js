import {React , useState , useEffect , useRef} from 'react';
import {Box, Card, CardMedia, Checkbox, Button} from "@mui/material"
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BoxWithMenu from "./BoxWithMenu"
import PopperMenu from './PopperMenu';
import PrepareData from './PrepareData';
import AudioPlayer from './sound';
import Backdrop from '@mui/material/Backdrop'
import CustomCursor from "./CustomCursor.png"

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
    [theme.breakpoints.down("xs")]: {
        width: "6em"
      },
    [theme.breakpoints.up("lg")]: {
        width: "8em",
      },
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

const DefectLogin = () => {
    // Set background color for the body
    document.body.style.backgroundColor = "#c6ffc8";
  
    // State variables
    const [data, setData] = useState();
    const [imgId, setImgId] = useState();
    const [currentButtons, setCurrrentButtons] = useState([]);//Current boxes drawed
    const [defect, setDefect] = useState({ part: null, defect: null });//info about defect
    const canvasRef = useRef(null);//ref hook for canvas
    const ctxRef = useRef(null);//ref hook for canvas
    const [defectCoords, setDefectCoords] = useState({ x: 0, y: 0 });//coordinates of defect
    const [pageStage, setPageStage] = useState("first")
    const navigate = useNavigate();
    const [images, setImages] = useState({});//state to store images and their urls 
  
    // Fetch data and set initial state
    useEffect(() => {
      axios
        .post("/login")
        .then(() => axios.get("/user"))
        .then((res) => {
          setData(PrepareData(res.data.DefectPage));
          return PrepareData(res.data.DefectPage);
        })
        .then((res) => {
          setImages((prev) => ({
            ...prev,
            [res.firstButtons[0].picId]:
              "https://vehq.com/wp-content/uploads/2021/08/An-underside-of-a-car-at-the-car-shop.jpg",
            [res.secondButton[0].picId]:
              "https://splashandgocarwash.com/wp-content/uploads/cars-undercarriage-1024x683.jpg",
          }));
          setImgId([res.firstButtons[0].picId]);
          setCurrrentButtons(res.firstButtons);
        });
    }, []);
  
    // Get background color from session storage
    const bgColor = sessionStorage.getItem("shiftInfo");
  
    // Initialize canvas and drawing functions
    let canvas;
    let ctx;
    let drawLine;
    let eraseLine;
    useEffect(() => {
      if (data && data.firstButtons) {
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
  
        // Function to draw a line on the canvas
        drawLine = (sx, sy, ex, ey) => {
          ctx.beginPath();
          ctx.moveTo(sx + 40, sy + 40);
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.lineTo(ex, ey);
          ctx.stroke();
        };
  
        // Function to erase the canvas
        eraseLine = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
      }
    });

    // Function to draw lines on the canvas based on currentButtons data
    const drawLines = () => {
        currentButtons.map((obj) => {
        const { boxX, boxY, lineX, lineY } = obj;
        if (!(lineX === -100 || lineY === -100)) {
            drawLine(boxX, boxY, lineX, lineY);
        }
        });
    };
  
    // Redraw lines on the canvas when defect.part or currentButtons change
    useEffect(() => {
        drawLines();
    }, [defect.part, currentButtons]);
    
  // Object with properties for getting coordinates
// This object defines the properties for the `onGettingCoords` event handler. It sets the cursor style to a custom image and specifies the `onClick` function to handle the click event.
  // The `handleCoordClick` function is called when a click event occurs on the specified element.
  const onGettingCoords = {
    style: { cursor: `url(${CustomCursor}), auto` },
          onClick: (e) => {
            e.preventDefault();
            handleCoordClick(e);
          }
        }
  
          // This function handles the click event of the first button.
  const handleFirstButtonClick= (childPicID , color , newButtonsArr , partName) => {
          // It takes the `childPicID`, `color`, `newButtonsArr`, and `partName` as parameters.
          // It updates the state variables and performs certain actions based on the button click.
          
          setDefect(prev => ({
              ...prev , part:partName
          }))
          // Update the `part` property of the `defect` state with the clicked `partName`.
          
          if(images[childPicID]){
              setImgId(childPicID)
              eraseLine()
              setCurrrentButtons(newButtonsArr)
          }
          // If the `childPicID` corresponds to a valid image, update the `imgId` state with the clicked `childPicID`.
          // Erase any existing lines drawn on the canvas.
          // Set the `currentButtons` state to the new `newButtonsArr`.
  
          if(!(color == "blue")){
              setDefect({part : "" , defect : ""})
              eraseLine()
              setCurrrentButtons([])
          }
          // If the button color is not blue, reset the `defect` state and clear the canvas by erasing any lines.
          // Set the `currentButtons` state to an empty array.
      }
      
          // This function handles the click event of the back button.
      const handleBackClick = (fButtons , newImg)=>{
          // It takes the `fButtons` and `newImg` as parameters.
          // It updates the state variables and performs certain actions based on the button click.
          
          if(currentButtons !== fButtons){
              setImgId(newImg)
              setCurrrentButtons(fButtons)
              eraseLine()
              setDefect({part : null, defect : null})
              setDefectCoords({x:0 , y:0})
          }
          // If the currentButtons state is not equal to `fButtons`, update the `imgId` state with `newImg`.
          // Set the `currentButtons` state to `fButtons`.
          // Erase any existing lines drawn on the canvas.
          // Reset the `defect` state and `defectCoords` state.
      }
      // The handleBackClick function is used to handle the click event of the back button.
      // It updates the state variables to go back to the previous state of the application.
  
  
        // This function handles the click event on the canvas to capture the coordinates.
      const handleCoordClick = (event) => {
        // It takes the event as a parameter and extracts the clientX and clientY properties from it.
      
        const { clientX, clientY } = event;
      
        setDefectCoords({ x: clientX, y: clientY });
        // Update the defectCoords state with the captured clientX and clientY coordinates.
      }
      
        // This function handles the click event on the back button in the menu.
      const backFromMenuClick = () => {
        // It resets the defect and defectCoords states to their initial values.
      
        setDefect({ part: null, defect: null });
        setDefectCoords({ x: 0, y: 0 });
      }
      
        // This function handles the click event on the clear button.
      const toClear = () => {
        // It clears the defectCoords and defect states if the part is not null.
      
        if (defect.part !== null) {
          setDefectCoords({ x: 0, y: 0 });
          setDefect({ part: null, defect: null });
        }
      }
      
     // This function handles the cancel action.
const toCancel = () => {
    // It closes the popper and resets the defectCoords and defect states.
    setPopperOpen(false);
    setDefectCoords({ x: 0, y: 0 });
  
    // The setDefect function is used to reset the defect state variable.
    // It maintains the "part" value from the previous state and sets the "defect" value to null or undefined.
    setDefect(prev => ({ 
      part: prev.part,
      defect: (prev.defect) ? null : undefined,
    }));
  };
  
      
      return (!(data) ? <h1>Loading..</h1> : (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0
          }}
        >
          <AudioPlayer />
      
          {/* Popper Menu */}
          {isPopperOpen && (
            <>
              <Backdrop open={true} sx={{ backdropFilter: 'blur(4px)' }} />
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 200,
                  minWidth: '600px',
                  width: '90vw',
                  maxWidth: "100%",
                  left: "%10",
                }}
              >
                {/* Render PopperMenu component */}
                <PopperMenu
                  toCancel={toCancel}
                  defect={defect}
                  defectCoords={defectCoords}
                  toMainPage={backFromMenuClick}
                />
              </Box>
            </>
          )}
      
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", minWidth: "970px" }}>
      
            {/* Left Section of the Page*/}
            <Box sx={{ display: "flex", flexDirection: "column", flex: "1", justifyContent: { xs: "space-between", md: "none", maxWidth: "800px" } }}>
      
              {/* Header Section */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex" }}>
                  <HeaderBox>
                    <HeaderTypography marginX={1}>Montaj No</HeaderTypography>
                    <HeaderTypography marginX={1}>{data.headerData.assyNo}</HeaderTypography>
                  </HeaderBox>
                  <HeaderBox sx={{ border: "1px black solid", borderRadius: "0.5rem", backgroundColor: bgColor }}>
                    <HeaderTypography marginX={1.5}>Body No</HeaderTypography>
                    <HeaderTypography marginX={1}>{data.headerData.bodyNo}</HeaderTypography>
                  </HeaderBox>
                  <HeaderBox>
                    <HeaderTypography marginX={1.5}>Hata Giriş Ekranı</HeaderTypography>
                  </HeaderBox>
                </Box>
      
                <HeaderBox sx={{ border: "1px black solid", borderRadius: "0.5rem", backgroundColor: data.headerData.bgColor }}>
                  <HeaderTypography color="white" marginX={1}>Renk</HeaderTypography>
                  <HeaderTypography color="white" marginX={1.5}>{data.headerData.extCode}</HeaderTypography>
                </HeaderBox>
      
              </Box>
      
              {/* Card Section */}
              <Card sx={{ position: "relative", width: "800px", height: "600px" }} {...((!(defect.defect === null) && (defectCoords.x === 0)) ? onGettingCoords : {})}>
                <CardMedia
                  sx={{ objectFit: "fill", height: "600px" }}
                  component={"img"}
                  image={images[imgId]}
                  alt="car img"
                />
                <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
                {(defect.defect == null) && currentButtons.map(obj => {
                  return (!(obj.List)) ? (
                    <Button
                      key={obj.labelText}
                      style={imgBoxProps(obj)}
                      onClick={() => {
                        handleFirstButtonClick(obj.childPicID, obj.boxColor, data.secondButton, obj.labelText)
                      }}
                    >
                      <Typography {...imgBoxTextStyle}>{obj.labelText}</Typography>
                    </Button>
                  ) : (
                    <BoxWithMenu
                      key={obj.labelText}
                      style={imgBoxProps(obj)}
                      setDefect={(defect) => {
                        setDefect(prev => ({
                          ...prev, defect: defect
                        }))
                      }}
                      options={obj.List}
                      label={<Typography {...imgBoxTextStyle}>{obj.labelText}</Typography>}
                    />
                  )
                })}
              </Card>
      
              {/* Footer Section */}
              <Box sx={{ display: "flex", fontSize: "1.2rem" }}>
                <OrdinaryBox onClick={() => navigate(-1)}>
                  <OrdinaryTypography>
                    Çıkış
                  </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox>
                  <OrdinaryTypography>
                    Model İlk Resmi
                  </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox onClick={() => handleBackClick(data.firstButtons, data.firstButtons[0].picId)}>
                  <OrdinaryTypography>
                    {"<"} Geri
                  </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox onClick={() => navigate("/defectList")}>
                  <OrdinaryTypography>
                    Hata Listesi
                  </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox onClick={toClear}>
                  <OrdinaryTypography>
                    Temizle
                  </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox>
                  <OrdinaryTypography>
                    Büyük Font
                  </OrdinaryTypography>
                </OrdinaryBox>
              </Box>
      
              {/* Display Selected Part */}
              <Box sx={{ display: "flex", justifyContent: "start" }}>
                <Typography sx={{ fontWeight: "700", fontSize: "1.5em" }}>
                  {defect.part}
                </Typography>
              </Box>
            </Box>
      
            {/* Right Section */}
            <Box fontSize={{ xs: "1.1em" }} sx={{ flex: "none", display: "flex", flexDirection: "column", flexWrap: { xs: "wrap" }, maxWidth: "7em" }}>
              <Box>
                {/* Technician Info */}
                <HeaderBox>
                  <Typography sx={{ display: "flex", justifyContent: "center", width: "80px", margin: 2, marginInlineEnd: "0.5em" }} color={"red"} fontWeight={600}>
                    {data.headerData.firstname} {data.headerData.lastname}
                  </Typography>
                </HeaderBox>
      
                {/* Checkbox Options */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox size={"medium"} />
                    <Typography fontSize={"0.9em"}>Harigami</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox size={"medium"} />
                    <Typography fontSize={"0.9em"}>RDD</Typography>
                  </Box>
                </Box>
      
                {/* Side Boxes */}
                <SideBox disabled sx={{ marginBlock: "0.2em" }}>
                  <OrdinaryTypography>
                    Hızlı Kaydet
                  </OrdinaryTypography>
                </SideBox>
                <SideBox disabled sx={{ marginBlock: "0.2em" }}>
                  <OrdinaryTypography>
                    Kaydet Ve Geç
                  </OrdinaryTypography>
                </SideBox>
                <SideBox disabled={defectCoords.x == 0} sx={{ marginBlock: "0.2em" }}
                  onClick={() => setPopperOpen(true)}
                >
                  <OrdinaryTypography>
                    Hata Kayıt
                  </OrdinaryTypography>
                </SideBox>
      
                {/* Assy No İnput */}
                <HeaderBox sx={{ width: "7em", marginBlock: 1.5 }}>
                  <Typography sx={{ width: { xs: "6em", lg: "8em" } }}>MONTAJ NO</Typography>
                  <input defaultValue={data.headerData.seqNo} style={{ fontSize: "2em", backgroundColor: "white", width: "2.5em" }} />
                </HeaderBox>
      
                {/* Buttons */}
                <SideBox sx={{ marginBlock: "0.2em", height: "5em" }}>
                  <OrdinaryTypography>
                    Ara
                  </OrdinaryTypography>
                </SideBox>
                <SideBox sx={{ marginBlock: "0.2em", height: "5em" }}>
                  <OrdinaryTypography>
                    Terminal İlk Resmi
                  </OrdinaryTypography>
                </SideBox>
                <SideBox sx={{ marginBlock: "0.2em", height: "5em" }}>
                  <OrdinaryTypography>
                    Sık Gelen Hata
                  </OrdinaryTypography>
                </SideBox>
                <SideBox sx={{ marginBlock: "0.2em", height: "5em" }}>
                  <OrdinaryTypography>
                    Manifest
                  </OrdinaryTypography>
                </SideBox>
              </Box>
      
              {/* Display Selected Defect */}
              <Box sx={{ display: "flex", justifyContent: "start", paddingInlineStart: 2 }}>
                <Typography sx={{ fontWeight: "700", fontSize: { xs: "1em", lg: "1.2em" } }}>
                  {defect.defect}
                </Typography>
              </Box>
      
              {/* Company Info */}
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: { xs: "80px", lg: "240px" }, margin: { xs: "0.5em", md: "1em" } }} color={"red"} fontWeight={600}>
                <Typography fontSize={"0.8rem"} sx={{ marginInlineEnd: "2px" }}>
                  TEKNİK DESTEK
                </Typography>
                <Typography color={"black"} fontSize={"0.8rem"} sx={{ marginInlineStart: "2px" }}>
                  {data.headerData.companyName}
                </Typography>
              </Box>
            </Box>
      
          </Box>
        </Box>
      ))
}

export default DefectLogin