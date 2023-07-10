import * as React from "react";
import { useContext } from "react";
import VirtualTable from "../../ReUsableComponents/VirtualTable";
import { DefectDataContext } from "../DefectDataProvider";
import { useTranslation } from "react-i18next";

const DefectTable = () => {

    const {data, setData} = useContext(DefectDataContext)
    const {initialData, setInitialData} = useContext(DefectDataContext)
    const tableRef = useContext(DefectDataContext); //hook to hols Virtual Table
    
    const { t } = useTranslation()
    
    const columns = [
      { field: "depCode", headerName: t("reporter"), minWidth: 56, align: "center" },
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
      { field: "colorData", headerName: t("color"), minWidth: 35, align: "center" },
      { field: "modelCode", headerName: "Mdl", minWidth: 35, align: "center" },
      { field: "termId", headerName: t("sicil"), minWidth: 45, align: "center" },
      {
        field: "partName",
        headerName: t("part"),
        minWidth: 160,
        height: 45,
        color: "red",
        width: "15vw",
      },
      { field: "spotCode", headerName: "Spot", minWidth: 35, align: "center" },
      { field: "spotgunName", headerName: "Gun", minWidth: 50, align: "center" },
      { field: "arcnutboltgunName", headerName: "Arc", minWidth: 50 },
      { field: "arcnutboltCode", headerName: "ArcGun", minWidth: 60 },
      { field: "defectName", headerName: t("defect"), minWidth: 160, width: "12vw" },
      { field: "defrankCode", headerName: "Rank", minWidth: 45 },
      {
        field: "formattedDefectHour",
        headerName: t("hour"),
        minWidth: 60,
        align: "center",
      },
      {
        field: "defectType",
        headerName: t("defType"),
        minWidth: 60,
        align: "center",
      },
      {
        field: "defrespName",
        headerName: t("defManager"),
        minWidth: 60,
        align: "center",
      },
      { field: "subResp", headerName: t("minorRes"), minWidth: 60 },
      {
        field: "nrReasons",
        headerName: "NR REASONS",
        minWidth: 115,
        align: "center",
      },
      { field: "save", headerName: t("save"), minWidth: 40, align: "center" },
      { field: "action", headerName: t("process"), minWidth: 63 },
    ]

    return (
      <VirtualTable data={initialData} columns={columns} nrReasonList={data.nrReasonList} ref={tableRef}  />
    )
}

export default DefectTable