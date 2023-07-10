import React from 'react';
import { Routes,Route } from "react-router-dom";
import TerminalList from './TerminalList/TerminalList';
import FormPage from './TerminalLogin/FormPage';
import DefectListPage from './DefectList/DefectListPage';
import { DefectLoginPage } from './DefectLoginPage/DefectLoginPage';
import NoPage from './NoPage';
const App=() => {

   return<>
   <Routes>
    <Route path="/" element={<TerminalList />} />
    <Route path=":depCode/:filterCode" element={<FormPage />}></Route>
    <Route path=":depCode/:filterCode/defectLogin" element={<DefectLoginPage/>}></Route>
    <Route path='/defectList' element={<DefectListPage/>} ></Route>
    <Route path='*' element={<NoPage/>} ></Route>
   </Routes>
    </>
    }

export default App
