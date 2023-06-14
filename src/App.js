import React from 'react';
import { Routes,Route } from "react-router-dom";
import TerminalList from './TerminalList/TerminalList';
import FormPage from './TerminalLogin/FormPage';
import DefectLogin from './DefectLoginPage/DefectLogin';
import HataListesi from './HataListe/HataListesi';

const App=() => {
   return<>
   <Routes>
    <Route path="/" element={<TerminalList />} />
    <Route path=":depCode/:filterCode" element={<FormPage />}></Route>
    <Route path=":depCode/:filterCode/hata-giris" element={<DefectLogin/>}></Route>
    <Route path='/hataListesi' element={<HataListesi/>} ></Route>
   </Routes>
    </>
    }

export default App
