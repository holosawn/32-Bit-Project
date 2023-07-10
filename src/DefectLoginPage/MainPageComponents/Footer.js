import { OrdinaryBox, OrdinaryTypography } from "../constants";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { DefectLoginContext } from '../DefectLoginProvider';
import { DataContext } from '../DataProvider';
import { useContext } from "react";
import { useTranslation } from "react-i18next";

// Footer component
export const Footer = ({}) => {
  const { t } = useTranslation()

  // Accessing data and state variables from context
  const { data, setData } = useContext(DataContext);
  const { imgId, setImgId } = useContext(DefectLoginContext);
  const { currentButtons, setCurrentButtons } = useContext(DefectLoginContext);
  const { defect, setDefect } = useContext(DefectLoginContext);
  const { defectCoords, setDefectCoords } = useContext(DefectLoginContext);
  const { isCoordSelect, setIsCoordSelect } = useContext(DefectLoginContext);
  const { isDrawLines, setDrawLines } = useContext(DefectLoginContext);
  const { isPopperOpen } = useContext(DefectLoginContext);

  const navigate = useNavigate();

  // Handle click event for the clear button
  const handleClearButton = () => {
    setDrawLines((prev) => !prev);
    setIsCoordSelect(false);
    if (defect.part) {
      setDefectCoords({ x: 0, y: 0 });
      setDefect((prev) => ({ ...prev, defect: null }));
    } else {
      setCurrentButtons(data.firstButtons);
      setDefectCoords({ x: 0, y: 0 });
      setDefect({ part: null, defect: null });
    }
  };

  // Handle click event for the back button
  const handleBackClick = () => {
    if (currentButtons !== data.firstButtons) {
      setImgId(data.firstButtons[0].picId);
      setCurrentButtons(data.firstButtons);
      setIsCoordSelect(false);
      setDefect({ part: null, defect: null });
      setDefectCoords({ x: 0, y: 0 });
    }
  };

  return (
    <div>
      {/* Footer buttons */}
      <Box sx={{ display: "flex", fontSize: "1.2rem" }}>
        {/* Exit button */}
        <OrdinaryBox onClick={() => navigate(-1)}>
          <OrdinaryTypography>
            {t("exit")}
          </OrdinaryTypography>
        </OrdinaryBox>
        {/* Model First Picture button */}
        <OrdinaryBox>
          <OrdinaryTypography>
            {t("mdlFirstPic")}
          </OrdinaryTypography>
        </OrdinaryBox>
        {/* Back button */}
        <OrdinaryBox onClick={handleBackClick}>
          <OrdinaryTypography>
            {"<"} {t("back")}
          </OrdinaryTypography>
        </OrdinaryBox>
        {/* Defect List button */}
        <OrdinaryBox onClick={() => navigate("/defectList")}>
          <OrdinaryTypography>
            {t("defectList")}
          </OrdinaryTypography>
        </OrdinaryBox>
        {/* Clear button */}
        <OrdinaryBox onClick={handleClearButton}>
          <OrdinaryTypography>
            {t("clear")}
          </OrdinaryTypography>
        </OrdinaryBox>
        {/* Big Font button */}
        <OrdinaryBox>
          <OrdinaryTypography>
            {t("bigFont")}
          </OrdinaryTypography>
        </OrdinaryBox>
      </Box>

      {/* Display selected part */}
      <Box sx={{ display: "flex", justifyContent: "start" }}>
        <Typography sx={{ fontWeight: "700", fontSize: "1.5em" }}>
          {defect.part}
        </Typography>
      </Box>
    </div>
  );
};
