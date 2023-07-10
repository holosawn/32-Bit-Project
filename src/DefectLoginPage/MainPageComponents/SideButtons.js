import {Box, Checkbox, Typography  } from "@mui/material"
import React, { useContext } from 'react';
import { DefectLoginContext } from '../DefectLoginProvider';
import { DataContext } from '../DataProvider';
import { OrdinaryTypography, HeaderBox, SideBox } from "../constants";

export const RightSection = () => {

  const { data } = useContext(DataContext);
  const { defectCoords, defect } = useContext(DefectLoginContext);
  const { isPopperOpen, setPopperOpen } = useContext(DefectLoginContext)

  return (
    <Box fontSize={{ xs: "1.1em" }} sx={{ flex: "none", display: "flex", flexDirection: "column", maxWidth: "7em" }}>
              <Box>
                {/* Technician Info */}
                  <Typography 
                    sx={{ display: "flex", justifyContent: "center", width:{xs:"80px", md:"100px"}, marginInlineStart: "0.5em" }} color={"red"} fontWeight={600}
                  >
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
  );
}