import React, { createContext, useState } from 'react';

// Create a context object
export const DefectLoginContext = createContext();

const DefectLoginProvider = ({ children }) => {
  // State variables
  const [imgId, setImgId] = useState(); // ID of the current image
  const [currentButtons, setCurrentButtons] = useState([]); // Current buttons on image
  const [defect, setDefect] = useState({ part: null, defect: null }); // Defect information
  const [defectCoords, setDefectCoords] = useState({ x: 0, y: 0 }); // Defect coordinates 
  const [isCoordSelect, setIsCoordSelect] = useState(false); // Bool value to see if coordination should be selected. 
  const [isPopperOpen, setPopperOpen] = useState(false); // Bool value to see if PopperMenu should be Open.
  const [isDrawLines, setDrawLines] = useState(false); // Bool value to understand if lines should be drawed
  const [images, setImages] = useState(); // state for images and their ID 

  return (
    // Provide the state values and setter functions to the children components through the context
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
        setImages,
      }}
    >
      {children}
    </DefectLoginContext.Provider>
  );
};

export default DefectLoginProvider;
