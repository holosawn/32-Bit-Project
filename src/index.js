import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider,createTheme } from '@mui/material';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette:{
      primary:{
        main:"#d4151f"
    },
    secondary:{
      main:"#c6ffc8",
      secondary:"white"
    },third:{
      main:"#000000"
    }  
  },
  typography:{
    kazil:{
      fontWeight:"700",
      color:"#d4141e",
      fontSize:"1.4rem"
    }
  }
}
)

root.render(

    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </BrowserRouter>
  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

