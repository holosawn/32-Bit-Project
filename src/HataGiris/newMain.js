import {React , useState , useEffect , useRef} from 'react';
import {Box, Card, CardMedia, Checkbox, Container, Button} from "@mui/material"
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import ButtonWithMenu from './CustomButton';
import PopperMenu from './PopperMenu';
import PrepareData from './PrepareData';
import AudioPlayer from './sound';

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

const NewHataGiris = () => {
    
    document.body.style.backgroundColor = "#c6ffc8" 
    const [data , setData] = useState()
    const [imgId , setImgId] = useState()
    const [currentButtons , setCurrrentButtons] = useState([])
    const [defect, setDefect] = useState({part : null , defect : null})
    const canvasRef = useRef(null);
    const ctxRef = useRef(null)
    const [defectCoords , setDefectCoords] = useState({x:0 ,y:0})
    const [isPopperOpen, setPopperOpen] = useState(false);
    const navigate = useNavigate()
    const [unnecessary , setUnnecessary] = useState(true)
    const [images , setImages] = useState({})
    
      
      useEffect(() => {
        axios.post("/login")
          .then(() => axios.get("/user"))
          .then(res => {setData(PrepareData(res.data.DefectPage))
                    return PrepareData(res.data.DefectPage)     })
          .then(res => {
                setImages(prev => ({
                    ...prev,
                    [res.firstButtons[0].picId]: 'https://vehq.com/wp-content/uploads/2021/08/An-underside-of-a-car-at-the-car-shop.jpg',
                    [res.secondButton[0].picId]: "https://splashandgocarwash.com/wp-content/uploads/cars-undercarriage-1024x683.jpg",
                }));
                setImgId([res.firstButtons[0].picId])
                setCurrrentButtons(res.firstButtons)
                })
        }, []);

    const bgColor = sessionStorage.getItem('vardiyaBilgisi')
    
    let canvas;
    let ctx;
    let drawLine;
    let eraseLine
    useEffect(() => {
            if(data && data.firstButtons){canvas = canvasRef.current
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
        }}
    })

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

    const onGettingCoords = {
        style: { cursor: 'url(data:image/png;base64,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), auto' },
        onClick: (e) => {
          e.preventDefault();
          handleCoordClick(e);
        }
      }
    const handleFirstButtonClick= (childPicID , color , newButtonsArr) => {
        if(images[childPicID]){
            setImgId(childPicID)
            eraseLine()
            setCurrrentButtons(newButtonsArr)
        }
        if(!(color == "blue")){
            setDefect({part : "" , defect : ""})
            eraseLine()
            setCurrrentButtons([])
        }
    }
    const handleBackClick = (fButtons , newImg)=>{
        if(currentButtons !== fButtons){
            setImgId(newImg)
            setCurrrentButtons(fButtons)
            eraseLine()
            setDefect({part : null, defect : null})
            setDefectCoords({x:0 , y:0})
        }
    }
    const handleCoordClick = (event) => {
        const { clientX, clientY } = event;
        setDefectCoords({ x: clientX, y: clientY });
    };
    const toClear = ()=>{ //eksik
        setDefectCoords({x:0 ,y:0})
        setDefect({part : null , defect : null})
        setUnnecessary(prev => !prev)
    }
    const toCancel = ()=> {
        setPopperOpen(false)
        setDefectCoords({x:0 ,y:0})
        setDefect({part : null , defect : null})
    }

    return (!(data) ? <h1>Loading..</h1>    
    : <Container sx={{position:"relative"}}>


    {isPopperOpen && 
        <Box sx={{position:"absolute" , zIndex:200 ,minWidth:"600px", width:"90vw" ,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"}}>
            <PopperMenu toCancel={toCancel} defect={defect} defectCoords={defectCoords} toMainPage={() => handleBackClick(data.firstButtons , data.firstButtons[0].picId)} />
        </Box>}

        <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center"}} >
            
            <Box sx={{display:"flex",flexDirection:"column",flex:"1",justifyContent:{xs:"space-between",md:"none" , maxWidth:"800px"}}}>

                <Box sx={{ display: "flex", justifyContent:"space-between",}}>

                    <Box sx={{ display: "flex"}}>
                        <HeaderBox>
                            <HeaderTypography variant='h6' marginX={1.5}>Montaj No</HeaderTypography>
                            <HeaderTypography variant='h6' marginX={1}>{data.headerData.assyNo}</HeaderTypography>
                        </HeaderBox>
                        <HeaderBox sx={{border:"1px black solid",borderRadius:"0.5rem", backgroundColor:bgColor}}>
                            <HeaderTypography variant='h6' marginX={1.5}>Body No</HeaderTypography>
                            <HeaderTypography variant='h6' marginX={1}>{data.headerData.bodyNo}</HeaderTypography>
                        </HeaderBox>
                        <HeaderBox>
                            <HeaderTypography variant='h5' marginX={1.5}>Hata Giriş Ekranı</HeaderTypography>
                        </HeaderBox>
                    </Box>

                    <HeaderBox sx={{border:"1px black solid",borderRadius:"0.5rem", backgroundColor:data.headerData.bgColor}}>
                        <HeaderTypography variant='h6' color="white" marginX={1}>Renk</HeaderTypography>
                        <HeaderTypography variant='h6' color="white" marginX={1.5}>{data.headerData.extCode}</HeaderTypography>
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
                            onClick={(  ) => handleFirstButtonClick(obj.childPicID , obj.boxColor , data.secondButton )}
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
                    <OrdinaryBox onClick={() => handleBackClick(data.firstButtons , data.firstButtons[0].picId)}>
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
                            {data.headerData.firstname} {data.headerData.lastname}
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
                        <input defaultValue={data.headerData.seqNo} style={{fontSize:"2em",backgroundColor:"white",width:"4em"}}/>
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
                        {data.headerData.companyName}
                    </Typography>
            </Box> 
        </Box>
        
        </Box>


                
    </Container>)
}

export default NewHataGiris