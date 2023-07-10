import { styled } from "@mui/material";
import { Button } from "@mui/material";

export const columns = [
    { field: "depCode", headerName: "Bildiren", minWidth: 56, align: "center" },
    {
      field: "formattedBodyNo",
      headerName: "Body",
      minWidth: 37,
      align: "center",
    },
    {
      field: "formattedAssyNo",
      headerName: "Assy",
      minWidth: 30,
      align: "center",
    },
    {
      field: "vinNo",
      headerName: "Vin",
      minWidth: 120,
      width: "12vw",
      align: "center",
    },
    { field: "colorData", headerName: "Renk", minWidth: 35, align: "center" },
    { field: "modelCode", headerName: "Mdl", minWidth: 35, align: "center" },
    { field: "termId", headerName: "Sicil", minWidth: 45, align: "center" },
    {
      field: "partName",
      headerName: "Parca",
      minWidth: 160,
      height: 45,
      color: "red",
      width: "15vw",
    },
    { field: "spotCode", headerName: "Spot", minWidth: 35, align: "center" },
    { field: "spotgunName", headerName: "Gun", minWidth: 50, align: "center" },
    { field: "arcnutboltgunName", headerName: "Arc", minWidth: 50 },
    { field: "arcnutboltCode", headerName: "ArcGun", minWidth: 60 },
    { field: "defectName", headerName: "Hata", minWidth: 160, width: "12vw" },
    { field: "defrankCode", headerName: "Rank", minWidth: 45 },
    {
      field: "formattedDefectHour",
      headerName: "Saat",
      minWidth: 60,
      align: "center",
    },
    {
      field: "defectType",
      headerName: "Hata Türü",
      minWidth: 60,
      align: "center",
    },
    {
      field: "defrespName",
      headerName: "Hata Sor",
      minWidth: 60,
      align: "center",
    },
    { field: "subResp", headerName: "Alt Sorumlu", minWidth: 60 },
    {
      field: "nrReasons",
      headerName: "NR REASONS",
      minWidth: 115,
      align: "center",
    },
    { field: "save", headerName: "Kaydet", minWidth: 40, align: "center" },
    { field: "action", headerName: "İşlem", minWidth: 63 },
  ];

export const StyledButton = styled(Button)(({ theme }) => ({
    border: "1px solid black",
    color: "black",
    margin: "0.3em",
    padding: 0,
    [theme.breakpoints.up("xs")]: {
      height: "3rem",
      width: "6vw",
    },
    [theme.breakpoints.up("md")]: {
      height: "3rem",
      width: "16vw",
    },
    [theme.breakpoints.up("lg")]: {
      height: "6rem",
      width: "8.5em",
    },
    [theme.breakpoints.up("xl")]: {
      height: "6rem",
      width: "10em",
    },
  }));