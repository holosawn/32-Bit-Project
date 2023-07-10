import React from 'react';
import PopperMenu from './MainPageComponents/PopperMenu';
import CanvasAndImage from './MainPageComponents/Card';
import AudioPlayer from './sound';
import { Header} from './MainPageComponents/Header';
import { Footer } from './MainPageComponents/Footer';
import { RightSection } from './MainPageComponents/SideButtons';
import DataProvider from './DataProvider';
import DefectLoginProvider from './DefectLoginProvider';


export const DefectLoginPage = () => {
  
  document.body.style.backgroundColor = "#c6ffc8";
  console.log("page rendered")
  return(
  <>  
  <AudioPlayer />
  <DataProvider>
    <DefectLoginProvider>
         
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", minWidth: "920px" }}>
      
            {/* Left Section of the Page*/}
            <div style={{ display: "flex", flexDirection: "column", flex: "1", justifyContent:"none", maxWidth: "800px"  }}> 

              <PopperMenu/>

              {/* Header Section */}
              <Header/>
          
              {/* Card Section */}
              <CanvasAndImage/>
      
              {/* Footer component */}
              <Footer />
              
            </div>
      
            {/* Right Section */}
            <RightSection/>
      
          </div>
    </DefectLoginProvider>
  </DataProvider>
  </>
)};

export default DefectLoginPage;
    