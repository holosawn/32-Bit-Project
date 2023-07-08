import {React , useState , useEffect , useRef} from 'react';
import {Box, Card, CardMedia, Checkbox, Button, Container} from "@mui/material"
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BoxWithMenu from "./BoxWithMenu"
import PopperMenu from './PopperMenu';
import PrepareData from './PrepareData';
import AudioPlayer from './sound';
import Backdrop from '@mui/material/Backdrop'

//Initialize cursor image
const CustomCursor = "data:image/png;base64,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"

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
    const [currentButtons, setCurrentButtons] = useState([]);//Current boxes drawed
    const [defect, setDefect] = useState({ part: null, defect: null });//info about defect
    const canvasRef = useRef(null);//ref hook for canvas
    const ctxRef = useRef(null);//ref hook for canvas
    const [defectCoords, setDefectCoords] = useState({ x: 0, y: 0 });//coordinates of defect
    const [isCoordSelect, setIsCoordSelect] = useState(false)
    const [isPopperOpen, setPopperOpen] = useState(false);// bool value to show popper Menu
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
          setCurrentButtons(res.firstButtons);
        });
    }, []);
  
    // Get background color from session storage
    const bgColor = sessionStorage.getItem("shiftInfo");
  
    // Function to draw a line on the canvas
    const drawLine = (sx, sy, ex, ey) => {
      if (ctxRef.current !== null) {
        const ctx = ctxRef.current
        ctx.beginPath();
        ctx.moveTo(sx + 40, sy + 40);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
    };

    // Function to erase the canvas
      const eraseLine = () => {
      if (ctxRef.current !== null) {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    useEffect(() => {
      if ((data) && ctxRef.current === null) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    },[images]);
    
    // Function to draw lines on the canvas based on currentButtons data
    const drawLines = () => {
      currentButtons.map((obj) => {
        const { boxX, boxY, lineX, lineY } = obj;
        if (!(lineX === -100 || lineY === -100)) {
          drawLine(boxX, boxY, lineX, lineY);
        }
      });
    };
    
    useEffect(() => {
      drawLines();
    }, [currentButtons]);
  
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
              setCurrentButtons(newButtonsArr)
          }
          // If the `childPicID` corresponds to a valid image, update the `imgId` state with the clicked `childPicID`.
          // Erase any existing lines drawn on the canvas.
          // Set the `currentButtons` state to the new `newButtonsArr`.
  
          if(!(color == "blue")){
              setDefect({part : "" , defect : ""})
              setIsCoordSelect(true)
              eraseLine()
              setCurrentButtons([])
          }
          // If the button color is not blue, reset the `defect` state and clear the canvas by erasing any lines.
          // Set the `currentButtons` state to an empty array.
      }
      
          // This function handles the click event of the back button.
      const handleBackClick = ()=>{
          // It takes the `fButtons` and `newImg` as parameters.
          // It updates the state variables and performs certain actions based on the button click.
          
          if(currentButtons !== data.firstButtons){
              setImgId(data.firstButtons[0].picId)
              setCurrentButtons(data.firstButtons)
              setIsCoordSelect(false)
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
        
        const canvas = canvasRef.current
        const canvasRect = canvas.getBoundingClientRect();
        const { pageX, pageY } = event;
        const clientX = pageX - canvasRect.left
        const clientY = pageY - canvasRect.top
        setDefectCoords({ x: clientX, y: clientY });
        // Update the defectCoords state with the captured clientX and clientY coordinates.
      }

        // This function handles the click event on the clear button.
      const toClear = () => {
        // It clears the defectCoords and defect states if the part is not null.
        drawLines()
        setIsCoordSelect(false)
        if (defect.part) {
          setDefectCoords({ x: 0, y: 0 });
          setDefect(prev => ({ 
            ...prev, defect: null 
          }))
        }
        else{
          setCurrentButtons(data.firstButtons)
          setDefectCoords({ x: 0, y: 0 });
          setDefect({ part: null, defect: null });
        }
      }
      
     // This function handles the cancel action.
      const toCancel = () => {
          // It closes the popper and resets the defectCoords and defect states.
          setPopperOpen(false)
        };
  
      return (!(data) ? <h1>Loading..</h1> : (
        <Box
          sx={{
            padding: 0,
            margin: 0
          }}
        >
          <AudioPlayer />
      
          {/* Popper Menu */}
          {isPopperOpen && (
            <Container sx={{display:"flex", justifyContent:"center", minWidth: "920px",}}>
              <Backdrop open={true} sx={{ backdropFilter: 'blur(4px)', zIndex:200}} />
                {/* Render PopperMenu component */}
                <PopperMenu
                  toCancel={toCancel}
                  defect={defect}
                  defectCoords={defectCoords}
                  toMainPage={() => {
                    toCancel()
                    handleBackClick()
                  }}
                />
            </Container >
          )}
      
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", minWidth: "920px" }}>
      
            {/* Left Section of the Page*/}
            <Box sx={{ display: "flex", flexDirection: "column", flex: "1", justifyContent:"none", maxWidth: "800px"  }}>
      
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
              <Card sx={{ position: "relative", width: "800px", height: "600px" }} {...(isCoordSelect ? onGettingCoords : {})}>
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
                      extraSelectEventHandler={() => {
                        setIsCoordSelect(true)
                        eraseLine()
                        }}
                      options={obj.List}
                      label={<Typography {...imgBoxTextStyle}>{obj.labelText}</Typography>}
                    />
                  )
                })}
                { defectCoords.x && <img src={CustomCursor} style={{position:"absolute", top:defectCoords.y, left:defectCoords.x}}></img>}
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
            <Box fontSize={{ xs: "1.1em" }} sx={{ flex: "none", display: "flex", flexDirection: "column", maxWidth: "7em" }}>
              <Box>
                {/* Technician Info */}
                  <Typography sx={{ display: "flex", justifyContent: "center", width:{xs:"80px", md:"100px"}, marginInlineStart: "0.5em" }} color={"red"} fontWeight={600}>
                    {data.headerData.firstname} {data.headerData.lastname}
                  </Typography>
           
      
                {/* Checkbox Options */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", flexShrink:0 }}>
                    <Checkbox size={"medium"} />
                    <Typography fontSize="0.9em">Harigami</Typography>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", flexShrink:0 }}>
                    <Checkbox size={"medium"} />
                    <Typography fontSize={"0.9em"}>RDD</Typography>
                  </div>
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