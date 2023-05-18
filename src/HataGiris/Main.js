import {React , useState , useEffect , useRef} from 'react';
import {Box, Card, CardMedia, Checkbox, Container, TextField, Button } from "@mui/material"
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import styled from '@emotion/styled';
import axios from "axios"
import {firstButtons,secondButton,Veri,Veri2} from './data';
import ButtonWithMenu from './CustomButton';

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
    alignItems:"center"
}))
const OrdinaryTypography=styled(Typography)(() => ({
    fontSize:"inherit",
    margin:"0.4em",
    marginBlock:"1em ",
    textAlign:"center",
}))

const HataGiris = () => {
    document.body.style.backgroundColor = "#c6ffc8" 
    const [data, setData] = useState("#ffffff")
    const [imgId , setImgId] = useState(71835)
    const [currentButtons , setCurrrentButtons] = useState(firstButtons)
    const [ChoosenDefect, setChoosenDefect] = useState()
    const canvasRef = useRef(null);
    const ctxRef = useRef(null)
    const [defectCoords , setDefectCoords] = useState({x:0 ,y:0})
    
    const isMediumScreen = useMediaQuery('(max-width:899px)');
    const someData= {}
    const images = { 71835 : 'https://vehq.com/wp-content/uploads/2021/08/An-underside-of-a-car-at-the-car-shop.jpg' ,
                     87897 : "https://splashandgocarwash.com/wp-content/uploads/cars-undercarriage-1024x683.jpg",}
    console.log(Veri)
    console.log(Veri2)

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

    const handleFirstButtonClick= (childPicID) => {
        if(images[childPicID]){
            setImgId(childPicID)
            eraseLine()
            setCurrrentButtons(secondButton)
        }
    }

    const handleBackClick = ()=>{
        if(currentButtons == secondButton){
            setImgId(71835)
            setCurrrentButtons(firstButtons)
            eraseLine()
            setChoosenDefect()
        }
    }

    const handleCoordClick = (event) => {
        const { clientX, clientY } = event;
        console.log("coords",clientX , clientY)
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
    
    useEffect(()=>{
        currentButtons.map(obj => {
            
            const {boxX ,boxY , lineX ,lineY} = obj
            if(!(lineX === -100 || lineY === -100)){
            drawLine(boxX ,boxY , lineX ,lineY)
            }
        })
    },[currentButtons])


    return data == "empty" ? <h1>Loading...</h1> : ( 
    <Container>
        <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} >
            <Box sx={{display:"flex",flexDirection:"column",flex:"1",justifyContent:{xs:"space-between",md:"none"}}}>

                <Box sx={{ display: "flex", justifyContent:"space-between",}}>

                    <Box sx={{ display: "flex"}}>
                        <HeaderBox>
                            <HeaderTypography variant='h6' marginX={1.5}>Montaj No</HeaderTypography>
                            <HeaderTypography variant='h6' marginX={1}>222</HeaderTypography>
                        </HeaderBox>
                        <HeaderBox sx={{border:"1px black solid",borderRadius:"0.5rem", backgroundColor:`${data}`}}>
                            <HeaderTypography variant='h6' marginX={1.5}>Body No</HeaderTypography>
                            <HeaderTypography variant='h6' marginX={1}>25073</HeaderTypography>
                        </HeaderBox>
                        <HeaderBox>
                            <HeaderTypography variant='h5' marginX={1.5}>Hata Giriş Ekranı</HeaderTypography>
                        </HeaderBox>
                    </Box>

                    <HeaderBox sx={{border:"1px black solid",borderRadius:"0.5rem", backgroundColor:"red"}}>
                        <HeaderTypography variant='h6' color="white" marginX={1}>3U5</HeaderTypography>
                        <HeaderTypography variant='h6' color="white" marginX={1.5}>Renk</HeaderTypography>
                    </HeaderBox>
                    
                </Box>

                
                <Card sx={{position:"relative",width:"800px",height:"600px"}} {...((ChoosenDefect && (defectCoords.x == 0)) ? onGettingCoords : {})} >
                    <CardMedia 
                    sx={{objectFit: "fill" , height:"600px" }}
                    component={"img"}
                    image={images[imgId]}
                    alt="car img"
                    />
                    <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 ,}} />
                    {!  ChoosenDefect && currentButtons.map(obj => {
                        

                        return (!(obj.List)) ? (
                        <Button style={kutucukProps(obj)}
                            onClick={(  ) => handleFirstButtonClick(obj.childPicID)}
                        >
                            <Typography {...kutucukTextStyle}>{obj.labelText}</Typography>   
                        </Button>
                        )

                        :(<ButtonWithMenu style={kutucukProps(obj)}
                        setDefect={(defect) => {setChoosenDefect(defect)}}
                        options={obj.List}
                        >
                            <Typography {...kutucukTextStyle}>{obj.labelText}</Typography>   
                        </ButtonWithMenu>)
                        
                        })}
                    
                </Card>

                <Box sx={{display:"flex",fontSize:{xs:"1rem",md:"1.2rem"}}}>
                    <OrdinaryBox>
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
                    <OrdinaryBox>
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
            </Box>

            <Box fontSize={{xs:"0.9rem",md:"1.1em",lg:"1.2rem"}} sx={{flex:"none",display:"flex",flexDirection:"column",flexWrap:{xs:"wrap",lg:"nowrap",},justifyContent:"space-between"}}>
                <Box>
                    <HeaderBox >
                        <Typography sx={{display:"flex",justifyContent:"center",width:{xs:"100px",md:"180px",lg:"240px"},margin:{xs:"0.5em",md:"1em"}}} color={"red"} fontWeight={600} >
                            YUSUF ZİYA BAŞBUĞ(AI)
                        </Typography>
                    </HeaderBox>

                    <Box   sx={{display:"flex",flexDirection:{xs:"column",lg:"row"}, justifyContent:"space-around"}}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <Checkbox size={isMediumScreen ? "small" :"large"}/> 
                            <Typography fontSize={"1.1em"}>Harigami</Typography>
                        </Box>
                        
                        <Box sx={{display:"flex" , alignItems:"center"}}>
                            <Checkbox size={isMediumScreen ? "small" :"large"}/> 
                            <Typography  fontSize={"1.1em"}>RDD</Typography>
                        </Box>
                    </Box>

                    <OrdinaryBox disabled sx={{height:{xs:"2em",md:"3em"},width:{xs:"9em",lg:"14em"}}}>
                        <OrdinaryTypography>
                            Hızlı Kaydet
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox disabled sx={{height:{xs:"3em",md:"3em"},width:{xs:"9em",lg:"14em"}}}>
                        <OrdinaryTypography>
                            Kaydet Ve Geç
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox disabled={ChoosenDefect == null} sx={{height:{xs:"2em",md:"3em"},width:{xs:"9em",lg:"14em"}}}>
                        <OrdinaryTypography>
                            Hata Kayıt
                        </OrdinaryTypography>
                    </OrdinaryBox>

                    <HeaderBox alignItems={"center"} sx={{width:{md:"160px",lg:"270px"}}}>
                        <Typography variant='h6'  >MONTAJ NO</Typography>
                        <TextField size='small'  sx={{width:{xs:"3.5em",md:"4em",lg:"7em"},fontSize:"2em",backgroundColor:"white"}}/>
                    </HeaderBox>

                    <OrdinaryBox sx={{height:{xs:"2em",md:"3em"},width:{xs:"9em",lg:"14em"}}}>
                        <OrdinaryTypography>
                            Ara
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox sx={{height:{xs:"3em",md:"3em"},width:{xs:"9em",lg:"14em"}}}>
                        <OrdinaryTypography>
                            Terminal İlk Resmi
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox sx={{height:{xs:"3em",md:"3em"},width:{xs:"9em",lg:"14em"}}}>
                        <OrdinaryTypography>
                            Sık Gelen Hata
                        </OrdinaryTypography>
                    </OrdinaryBox>
                    <OrdinaryBox sx={{height:{xs:"2em",md:"3em"},width:{xs:"9em",lg:"14em"}}}>
                        <OrdinaryTypography>
                            Manifest
                        </OrdinaryTypography>
                    </OrdinaryBox>
                </Box>

                <Box sx={{display:"flex",flexDirection:{xs:"column",lg:"row"},justifyContent:"center",width:{xs:"100px",md:"180px",lg:"240px"},margin:{xs:"0.5em",md:"1em"}}} color={"red"} fontWeight={600}>
                    <Typography fontSize={"0.8rem"} sx={{marginInlineEnd:"2px"}}  >
                        TEKNİK DESTEK 
                    </Typography>
                    <Typography color={"black"} fontSize={"0.8rem"} sx={{marginInlineStart:"2px"}} >
                        CVGS (TMMT)
                    </Typography>
                </Box> 
            </Box>
        </Box>
    </Container>
    )
}

export default HataGiris