import {React , useState , useEffect , useRef} from 'react';
import {Box, Card, CardMedia, Checkbox, Container, Input, Button} from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from "axios"
import { firstButtons , secondButton , headerData, defectScreen2 } from './data';
import ButtonWithMenu from './CustomButton';
import PopperMenu from './PopperMenu';

const HeaderBox =styled(Box)(() => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
}))
const HeaderTypography =styled(Typography)(() => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"center"
}))
const OrdinaryBox=styled(Button)(() => ({
    color:"black",
    fontSize:"inherit",
    border:"1px black solid",
    borderRadius:"0.3rem",
    margin:"0.1em", 
    flexGrow:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"3em"
}))
const OrdinaryTypography=styled(Typography)(() => ({
    fontSize:"1rem",
    fontWeight:"500",
    margin:"0.4em",
    marginBlock:"1em ",
    textAlign:"center",
}))

const HataGiris = () => {

    document.body.style.backgroundColor = "#c6ffc8" 
    const [data, setData] = useState("#ffffff")
    const [imgId , setImgId] = useState(71835)
    const [currentButtons , setCurrrentButtons] = useState(firstButtons)
    const [defect, setDefect] = useState({part : null , defect : null})
    const canvasRef = useRef(null);
    const ctxRef = useRef(null)
    const [defectCoords , setDefectCoords] = useState({x:0 ,y:0})
    const [isPopperOpen, setPopperOpen] = useState(false);
    const navigate = useNavigate()
    const [unnecessary , setUnnecessary] = useState(true)
    
    const isMediumScreen = useMediaQuery('(max-width:899px)');
    const images = { [defectScreen2.data[0].motherPictureId] : 'https://vehq.com/wp-content/uploads/2021/08/An-underside-of-a-car-at-the-car-shop.jpg' ,
                     [defectScreen2.data[0].lastPictureId] : "https://splashandgocarwash.com/wp-content/uploads/cars-undercarriage-1024x683.jpg",}

    const kutucukProps=(obj)=>({
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
    const kutucukTextStyle={
        fontSize:"0.6rem", fontWeight:"600", sx:({backgroundColor:"white",position:"absolute",width:"70px",
    })}


    useEffect(() => {
        axios.get("/getShift")
        .then(res => setData(res.data.shiftColor.color) )
    },[])

    const handleFirstButtonClick= (childPicID , color) => {
        if(images[childPicID]){
            setImgId(childPicID)
            eraseLine()
            setCurrrentButtons(secondButton)
        }
        if(!(color == "blue")){
            setDefect({part : "" , defect : ""})
            eraseLine()
            setCurrrentButtons([])
        }
    }

    const handleBackClick = ()=>{
        if(currentButtons == secondButton){
            setImgId(71835)
            setCurrrentButtons(firstButtons)
            eraseLine()
            setDefect({part : null, defect : null})
            setDefectCoords({x:0 , y:0})
        }
    }

    const handleCoordClick = (event) => {
        const { clientX, clientY } = event;
        setDefectCoords({ x: clientX, y: clientY });
      };
     
    const onGettingCoords = {
          style:{ cursor: "pointer" },
          onClick: (e) => {
              e.preventDefault()
              handleCoordClick(e)}
      };
  

    let canvas;
    let ctx;
    let drawLine;
    let eraseLine;
    useEffect(() => {
            canvas = canvasRef.current
            ctx = canvas.getContext("2d");
            ctxRef.current = ctx;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        
        drawLine=(sx,sy,ex,ey)=>{
            ctx.beginPath();
                ctx.moveTo(sx+ 40 , sy+ 40);
                
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                
                ctx.lineTo(ex, ey);
                ctx.stroke();
        }

        eraseLine=() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    },)

    const DrawLines = () => {
        currentButtons.map(obj => {
            console.log("drawed")
            
            const {boxX ,boxY , lineX ,lineY} = obj
            if(!(lineX === -100 || lineY === -100)){
            drawLine(boxX ,boxY , lineX ,lineY)
            }
        })
    }
    
    useEffect(()=>{
        DrawLines()
    },[defect.part,currentButtons , unnecessary])

    const toCancel = ()=> {
        setPopperOpen(false)
        setDefectCoords({x:0 ,y:0})
        setDefect({part : null , defect : null})
    }

    const toClear = ()=>{
        if(!currentButtons[0]){
            setCurrrentButtons(firstButtons)
        }
        setDefectCoords({x:0 ,y:0})
        setDefect({part : null , defect : null})
        setUnnecessary(prev => !prev)
    }
    return data == "empty" ? <h1>Loading...</h1> : ( 
    <Container sx={{position:"relative"}}>


    {isPopperOpen && 
        <Box sx={{position:"absolute" , zIndex:200 ,minWidth:"600px", width:"90vw" ,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"}}>
            <PopperMenu toCancel={toCancel} defect={defect} defectCoords={defectCoords} toMainPage={handleBackClick} />
        </Box>}



        <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center"}} >
            <Box sx={{display:"flex",flexDirection:"column",flex:"1",justifyContent:{xs:"space-between",md:"none" , maxWidth:"800px"}}}>

                <Box sx={{ display: "flex", justifyContent:"space-between",}}>

                    <Box sx={{ display: "flex"}}>
                        <HeaderBox>
                            <HeaderTypography variant='h6' marginX={1.5}>Montaj No</HeaderTypography>
                            <HeaderTypography variant='h6' marginX={1}>{headerData.assyNo}</HeaderTypography>
                        </HeaderBox>
                        <HeaderBox sx={{border:"1px black solid",borderRadius:"0.5rem", backgroundColor:`${data}`}}>
                            <HeaderTypography variant='h6' marginX={1.5}>Body No</HeaderTypography>
                            <HeaderTypography variant='h6' marginX={1}>{headerData.bodyNo}</HeaderTypography>
                        </HeaderBox>
                        <HeaderBox>
                            <HeaderTypography variant='h5' marginX={1.5}>Hata Giriş Ekranı</HeaderTypography>
                        </HeaderBox>
                    </Box>

                    <HeaderBox sx={{border:"1px black solid",borderRadius:"0.5rem", backgroundColor:headerData.bgColor}}>
                        <HeaderTypography variant='h6' color="white" marginX={1}>Renk</HeaderTypography>
                        <HeaderTypography variant='h6' color="white" marginX={1.5}>{headerData.extCode}</HeaderTypography>
                    </HeaderBox>
                    
                </Box>

                
                <Card sx={{position:"relative",width:"800px",height:"600px"}} {...((!(defect.defect == null) && (defectCoords.x == 0)) ? onGettingCoords : {})} >
                    <CardMedia 
                    sx={{objectFit: "fill" , height:"600px" }}
                    component={"img"}
                    image={images[imgId]}
                    alt="car img"
                    />
                    <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 ,}} />
                    {(defect.defect == null) && currentButtons.map(obj => {

                        return (!(obj.List)) ? (
                        <Button style={kutucukProps(obj)}
                            onClick={(  ) => handleFirstButtonClick(obj.childPicID , obj.boxColor)}
                        >
                            <Typography {...kutucukTextStyle}>{obj.labelText}</Typography>   
                        </Button>
                        )

                        :(<ButtonWithMenu style={kutucukProps(obj)}
                        setDefect={(defect) => {
                            setDefect(prev => ({
                            ...prev , defect:defect
                        }))}}

                        setPart={() =>{
                            setDefect(prev => ({
                            ...prev , part:obj.labelText
                        }))}}
                        options={obj.List}
                        label={<Typography {...kutucukTextStyle}>{obj.labelText}</Typography>}
                        />)
                        
                        })}
                    
                </Card>

                <Box sx={{display:"flex",fontSize:"1.2rem"}}>
                    <OrdinaryBox onClick={() => navigate(-1)}>
                        <OrdinaryTypography >
                            Çıkış
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox>
                        <OrdinaryTypography>
                            Model İlk Resmi
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox onClick={handleBackClick}>
                        <OrdinaryTypography>
                            {"<"} Geri
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox>
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

                <Box sx={{display:"flex" , justifyContent:"start"}}>
                    <Typography sx={{fontWeight:"700" , fontSize:"1.5em"}}>
                        {defect.part}
                    </Typography>
                </Box>
            </Box>

        <Box fontSize={{xs:"1.1em"}} sx={{flex:"none",display:"flex",flexDirection:"column",flexWrap:{xs:"wrap",lg:"nowrap",},justifyContent:"space-between"}}>
            <Box>
                    <HeaderBox >
                        <Typography sx={{display:"flex",justifyContent:"center",width:{xs:"100px",md:"180px",lg:"240px"},margin:{xs:"0.5em",md:"1em"}}} color={"red"} fontWeight={600} >
                            {headerData.firstname} {headerData.lastname}
                        </Typography>
                    </HeaderBox>

                    <Box   sx={{display:"flex",flexDirection:{xs:"column",lg:"row"}, justifyContent:"space-around"}}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <Checkbox size={"large"}/> 
                            <Typography fontSize={"1.1em"}>Harigami</Typography>
                        </Box>
                        
                        <Box sx={{display:"flex" , alignItems:"center"}}>
                            <Checkbox size={"large"}/> 
                            <Typography  fontSize={"1.1em"}>RDD</Typography>
                        </Box>
                    </Box>

                    <OrdinaryBox disabled sx={{height:"3em",width:{xs:"9em",lg:"11em"}}}>
                        <OrdinaryTypography>
                            Hızlı Kaydet
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox disabled sx={{height:"3em",width:{xs:"9em",lg:"11em"}}}>
                        <OrdinaryTypography>
                            Kaydet Ve Geç
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox disabled={defectCoords.x == 0} sx={{height:{xs:"3em"},width:{xs:"9em",lg:"11em"}}}
                                 onClick={() => setPopperOpen(true)}   
                    >
                        <OrdinaryTypography>
                            Hata Kayıt
                        </OrdinaryTypography>
                    </OrdinaryBox>

                    <HeaderBox alignItems={"center"} sx={{width:{xs:"9em",lg:"11em"}}}>
                        <Typography variant='h6'>MONTAJ NO</Typography>
                        <input defaultValue={headerData.seqNo} style={{fontSize:"2em",backgroundColor:"white",width:"4em"}}/>
                    </HeaderBox>

                    <OrdinaryBox sx={{height:"3em",width:{xs:"9em",lg:"11em"}}}>
                        <OrdinaryTypography>
                            Ara
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox sx={{height:"3em",width:{xs:"9em" ,lg:"11em"}}}>
                        <OrdinaryTypography>
                            Terminal İlk Resmi
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox sx={{height:"3em",width:{xs:"9em",lg:"11em"}}}>
                        <OrdinaryTypography>
                            Sık Gelen Hata
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox sx={{height:"3em",width:{xs:"9em",lg:"11em"}}}>
                        <OrdinaryTypography>
                            Manifest
                        </OrdinaryTypography>
                    </OrdinaryBox>
            </Box>

            <Box sx={{display:"flex" , justifyContent:"start", paddingInlineStart:2}}>
                    <Typography sx={{fontWeight:"700" , fontSize:"1.5em"}}>
                        {defect.defect}
                    </Typography>
            </Box>

            <Box sx={{display:"flex",flexDirection:{xs:"column",lg:"row"},justifyContent:"center",width:{xs:"100px",md:"180px",lg:"240px"},margin:{xs:"0.5em",md:"1em"}}} color={"red"} fontWeight={600}>
                    <Typography fontSize={"0.8rem"} sx={{marginInlineEnd:"2px"}}  >
                        TEKNİK DESTEK 
                    </Typography>
                    <Typography color={"black"} fontSize={"0.8rem"} sx={{marginInlineStart:"2px"}} >
                        {headerData.companyName}
                    </Typography>
            </Box> 
        </Box>
        
        </Box>


                
    </Container>
    )
}

export default HataGiris