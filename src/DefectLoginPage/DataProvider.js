import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PrepareData from './PrepareData';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .post("/login")
      .then(() => axios.get("/user"))
      .then((res) => {
        const preparedData = PrepareData(res.data.DefectPage);
        setData(preparedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return data === null ? null : (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
