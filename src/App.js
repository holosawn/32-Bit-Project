import './App.css';
import React from 'react';
import { Routes,Route } from "react-router-dom";
import TerminalList from './TerminalList/TerminalList';
import Login from './TerminalLogin/Login';

const App=() => {
   return<>
    <Routes>
        <Route path='/' element={<TerminalList/>}></Route>
        <Route path=":depCode/:filterCode" element={<Login/>}></Route>
        
    </Routes>
    </>
    }

export default App
