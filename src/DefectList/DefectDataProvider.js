import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import prepareData from './PrepareData';

// Create a context for the Defect Data
export const DefectDataContext = createContext();

// DefectDataProvider component is a context provider for defect data
const DefectDataProvider = ({ children }) => {
  const [data, setData] = useState("empty"); // State to store the defect data
  const tableRef = useRef(); // Ref to hold the Virtual Table component
  const [initialData, setInitialData] = useState(); // State to store the initial data for the table
  
  useEffect(() => {
    // Fetch the defect data from the server
    axios
      .post("/login") // Perform login request
      .then(() => axios.get("/user")) // Get the user data
      .then((res) => {
        const preparedData = prepareData(res.data.DefectList.data[0]); // Prepare the data for the table
        setData(preparedData); // Set the defect data state
        setInitialData(preparedData.rows); // Set the initial data state for the table
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // If the defect data is empty, render null
  if (data === "empty") {
    return null;
  }

  // Render the DefectDataContext.Provider with the defect data and other values
  return (
    <DefectDataContext.Provider value={{ data, setData, tableRef, initialData, setInitialData }}>
      {children}
    </DefectDataContext.Provider>
  );
};

export default DefectDataProvider;
