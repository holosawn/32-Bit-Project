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
  return(
  <>  
  <AudioPlayer />
         
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", minWidth: "920px" }}>
      
            {/* Left Section of the Page*/}
            <div style={{ display: "flex", flexDirection: "column", flex: "1", justifyContent:"none", maxWidth: "800px"  }}> 

            <DataProvider>
              <DefectLoginProvider>

                <PopperMenu/>

              </DefectLoginProvider>
            </DataProvider>

            <DataProvider>
                {/*Header section*/}
                <Header/>
            </DataProvider>

            <DataProvider>
              <DefectLoginProvider>

                {/* Card Section */}
                <CanvasAndImage/>
        
                {/* Footer component */}
                <Footer />

              </DefectLoginProvider>
            </DataProvider>
            </div>
      
            {/* Right Section */}
            <DataProvider>
              <DefectLoginProvider>

                <RightSection/>

              </DefectLoginProvider>
            </DataProvider>
      
          </div>
  </>
)};

export default DefectLoginPage;
    