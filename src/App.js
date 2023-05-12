import React from 'react';
import { Routes,Route } from "react-router-dom";
import TerminalList from './TerminalList/TerminalList';
import Login from './TerminalLogin/Login';
import HataGiris from './HataGiris/Main';

const App=() => {
   return<>
   <Routes>
    <Route path="/" element={<TerminalList />} />
    <Route path=":depCode/:filterCode" element={<Login />}></Route>
    <Route path=":depCode/:filterCode/hata-giris" element={<HataGiris/>}></Route>
   </Routes>
    </>
    }

export default App
