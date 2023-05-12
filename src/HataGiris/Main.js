import {React , useState , useEffect} from 'react';
import {Box, Card, CardMedia, Checkbox, Container } from "@mui/material"
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import axios from "axios"

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
const OrdinaryBox=styled(Box)(({theme}) => ({
    border:"1px black solid",
    borderRadius:"0.3rem",
    margin:"0.1rem",
    flexGrow:1,
    display:"flex",
    justifyContent:"center"
}))
const OrdinaryTypography=styled(Box)(({theme}) => ({
    fontSize:"1.2rem",
    margin:"0.5rem",
    marginBlock:"1rem "
}))

const HataGiris = () => {
    document.body.style.backgroundColor = "#c6ffc8"
    const [data, setData] = useState("#ffffff")

    useEffect(() => {
        axios.get("/getShift")
        .then(res => setData(res.data.shiftColor.color) )
    },[])

    return data == "empty" ? <h1>Loading...</h1> : ( 
    <Container>
        <Box sx={{display:"flex",justifyContent:"space-between"}} >
            <Box sx={{display:"flex",flexDirection:"column",flex:"1"}}>

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

                <Card>
                    <CardMedia 
                    component={"img"}
                    image='https://vehq.com/wp-content/uploads/2021/08/An-underside-of-a-car-at-the-car-shop.jpg'
                    alt="car img"
                    />
                </Card>

                <Box sx={{display:"flex",}}>
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
                    <OrdinaryBox>
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

            <Box sx={{flex:"none"}}>
                <HeaderBox>
                    <Typography color={"red"} fontWeight={600} margin={2}>
                        Yusuf Ziya Başbuğ (AI)
                    </Typography>
                </HeaderBox>

                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <Checkbox size='large'/> 
                        <Typography fontSize={"1.3rem"}>Harigami</Typography>
                    </Box>
                    
                    <Box sx={{display:"flex", justifyContent:"space-between" , alignItems:"center"}}>
                        <Checkbox size='large' sx={{marginInlineEnd:0}}/> 
                        <Typography  fontSize={"1.3rem"}>RDD</Typography>
                    </Box>
                </Box>

                <OrdinaryBox>
                    <OrdinaryTypography>
                        Hızlı Kaydet
                    </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox>
                    <OrdinaryTypography>
                        Kaydet Ve Geç
                    </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox>
                    <OrdinaryTypography>
                        Hata Kayıt
                    </OrdinaryTypography>
                </OrdinaryBox>

                <HeaderBox>
                    <Typography variant='h6' fontSize={"1.4rem"}>Montaj No</Typography>
                    <input style={{lineHeight:"3rlh",width:"12rem",fontSize:"2rem"}} value={222} fontSize="2rem"></input>
                </HeaderBox>

                <OrdinaryBox>
                    <OrdinaryTypography>
                        Ara
                    </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox>
                    <OrdinaryTypography>
                        Terminal İlk Resmi
                    </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox>
                    <OrdinaryTypography>
                        Sık Gelen Hata
                    </OrdinaryTypography>
                </OrdinaryBox>
                <OrdinaryBox>
                    <OrdinaryTypography>
                        Manifest
                    </OrdinaryTypography>
                </OrdinaryBox>
            </Box>
        </Box>
    </Container>
    )
}

export default HataGiris