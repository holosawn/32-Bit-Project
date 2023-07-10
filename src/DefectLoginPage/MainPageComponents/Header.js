import { HeaderBox, HeaderTypography } from "../constants";
import { Box } from "@mui/material";
import { DataContext } from "../DataProvider";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Header component
export const Header = () => {
    const {data , setData} = useContext(DataContext)
    const { t } = useTranslation()
    
    // Get background color from session storage
    const bgColor = sessionStorage.getItem("shiftInfo");

    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <HeaderBox>
            <HeaderTypography marginX={1}>{t("assy")}</HeaderTypography>
            <HeaderTypography marginX={1}>{data.headerData.assyNo}</HeaderTypography>
          </HeaderBox>
          <HeaderBox sx={{ border: "1px black solid", borderRadius: "0.5rem", backgroundColor: bgColor }}>
            <HeaderTypography marginX={1.5}>{t("bodyNo")}</HeaderTypography>
            <HeaderTypography marginX={1}>{data.headerData.bodyNo}</HeaderTypography>
          </HeaderBox>
          <HeaderBox>
            <HeaderTypography marginX={1.5}>{t("defectlogscreen")}</HeaderTypography>
          </HeaderBox>
        </Box>
  
        <HeaderBox sx={{ border: "1px black solid", borderRadius: "0.5rem", backgroundColor: data.headerData.bgColor }}>
          <HeaderTypography color="white" marginX={1}>{t("color")}</HeaderTypography>
          <HeaderTypography color="white" marginX={1.5}>{data.headerData.extCode}</HeaderTypography>
        </HeaderBox>
      </Box>
    );
  };
