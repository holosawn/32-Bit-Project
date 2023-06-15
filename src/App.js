import React from 'react';
import { Routes,Route } from "react-router-dom";
import TerminalList from './TerminalList/TerminalList';
import FormPage from './TerminalLogin/FormPage';
import DefectLogin from './DefectLoginPage/DefectLogin';
import DefectPage from './DefectList/DefectList';

const App=() => {
   return<>
   <Routes>
    <Route path="/" element={<TerminalList />} />
    <Route path=":depCode/:filterCode" element={<FormPage />}></Route>
    <Route path=":depCode/:filterCode/defectLogin" element={<DefectLogin/>}></Route>
    <Route path='/defectList' element={<DefectPage/>} ></Route>
   </Routes>
    </>
    }

export default App
