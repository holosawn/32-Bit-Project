import * as React from "react";
import { useContext } from "react";
import VirtualTable from "../../ReUsableComponents/VirtualTable";
import { DefectDataContext } from "../DefectDataProvider";
import { columns } from "../Constants";

const DefectTable = () => {

    const {data, setData} = useContext(DefectDataContext)
    const {initialData, setInitialData} = useContext(DefectDataContext)
    const tableRef = useContext(DefectDataContext); //hook to hols Virtual Table
    
    return (
      <VirtualTable data={initialData} columns={columns} nrReasonList={data.nrReasonList} ref={tableRef}  />
    )
}

export default DefectTable