import { OrdinaryBox, OrdinaryTypography } from "../constants";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { DefectLoginContext } from '../DefectLoginProvider';
import { DataContext } from '../DataProvider';
import { useContext } from "react";

  // Footer component
  export const Footer = ({}) => {

    const {data, setData} = useContext(DataContext);
    const {imgId, setImgId} = useContext(DefectLoginContext)
    const {currentButtons, setCurrentButtons} = useContext(DefectLoginContext)
    const {defect, setDefect} = useContext(DefectLoginContext)
    const {defectCoords, setDefectCoords} = useContext(DefectLoginContext)
    const {isCoordSelect, setIsCoordSelect} = useContext(DefectLoginContext)
    const {isDrawLines, setDrawLines} = useContext(DefectLoginContext)
    const {isPopperOpen} = useContext(DefectLoginContext)

    const navigate = useNavigate();
    
    const handleClearButton = () => {

        setDrawLines(prev => !prev)
        setIsCoordSelect(false)
        if (defect.part) {
            setDefectCoords({ x: 0, y: 0 });
            setDefect(prev => ({ 
              ...prev, defect: null 
            }))
          }
        else{
            setCurrentButtons(data.firstButtons)
            setDefectCoords({ x: 0, y: 0 });
            setDefect({ part: null, defect: null });
          }
    }

     // This function handles the click event of the back button.
    const handleBackClick = ()=>{
    // It takes the `fButtons` and `newImg` as parameters.
    // It updates the state variables and performs certain actions based on the button click.

    if(currentButtons !== data.firstButtons){
        setImgId(data.firstButtons[0].picId)
        setCurrentButtons(data.firstButtons)
        setIsCoordSelect(false)
        setDefect({part : null, defect : null})
        setDefectCoords({x:0 , y:0})
    }
    // If the currentButtons state is not equal to `fButtons`, update the `imgId` state with `newImg`.
    // Set the `currentButtons` state to `fButtons`.
    // Erase any existing lines drawn on the canvas.
    // Reset the `defect` state and `defectCoords` state.
    }
    // The handleBackClick function is used to handle the click event of the back button.
    // It updates the state variables to go back to the previous state of the application.

    return (
      <div>
        <Box sx={{ display: "flex", fontSize: "1.2rem" }}>
          <OrdinaryBox onClick={() => navigate(-1)}>
            <OrdinaryTypography>
              Çıkış
            </OrdinaryTypography>
          </OrdinaryBox>
          <OrdinaryBox>
            <OrdinaryTypography>
              Model İlk Resmi
            </OrdinaryTypography>
          </OrdinaryBox>
          <OrdinaryBox onClick={handleBackClick}>
            <OrdinaryTypography>
              {"<"} Geri
            </OrdinaryTypography>
          </OrdinaryBox>
          <OrdinaryBox onClick={() => navigate("/defectList")}>
            <OrdinaryTypography>
              Hata Listesi
            </OrdinaryTypography>
          </OrdinaryBox>
          <OrdinaryBox onClick={handleClearButton}>
            <OrdinaryTypography>
              Temizle
            </OrdinaryTypography>
          </OrdinaryBox>
          <OrdinaryBox>
            <OrdinaryTypography>
              Büyük Font
            </OrdinaryTypography>
          </OrdinaryBox>
        </Box>

        {/* Display Selected Part */}
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Typography sx={{ fontWeight: "700", fontSize: "1.5em" }}>
                  {defect.part}
          </Typography>
        </Box>
      </div>
    );
  };
  