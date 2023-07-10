import React, { createContext, useState } from 'react';

export const DefectLoginContext = createContext();

const DefectLoginProvider = ({ children }) => {
    const [imgId, setImgId] = useState();
    const [currentButtons, setCurrentButtons] = useState([]);
    const [defect, setDefect] = useState({ part: null, defect: null });
    const [defectCoords, setDefectCoords] = useState({ x: 0, y: 0 });
    const [isCoordSelect, setIsCoordSelect] = useState(false);
    const [isPopperOpen, setPopperOpen] = useState(false);
    const [isDrawLines, setDrawLines] = useState(false);
    const [images, setImages] = useState();
  
    return (
      <DefectLoginContext.Provider
        value={{
          imgId,
          setImgId,
          currentButtons,
          setCurrentButtons,
          defect,
          setDefect,
          defectCoords,
          setDefectCoords,
          isCoordSelect,
          setIsCoordSelect,
          isPopperOpen,
          setPopperOpen,
          isDrawLines,
          setDrawLines,
          images,
          setImages
        }}
      >
        {children}
      </DefectLoginContext.Provider>
    );
  };

  export default DefectLoginProvider