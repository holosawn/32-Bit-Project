import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import prepareData from './PrepareData';

export const DefectDataContext = createContext()


const DefectDataProvider = ({children}) => {
    const [data, setData] = useState("empty")
    const tableRef = useRef(); //hook to hols Virtual Table
    const [initialData, setInitialData] = useState()
    
    useEffect(() => {
        axios
        .post("/login")
        .then(() => axios.get("/user"))
        .then(res => {
            const preparedData = prepareData(res.data.DefectList.data[0])
            setData(preparedData)
            setInitialData(preparedData.rows)
        })
        .catch((error) => {
            console.log(error);
          });
    },[])

    return data === "empty" ? null : (
        <DefectDataContext.Provider value={{data, setData, tableRef, initialData, setInitialData}}>
            {children}
        </DefectDataContext.Provider>
    )
}

export default DefectDataProvider