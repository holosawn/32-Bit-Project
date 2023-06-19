//Function to extract specified data from page data
const PrepareData = (DefectPage) => {
  // Destructure properties from the DefectPage object
  const { HeaderData, defectScreen, defectScreen2 } = DefectPage;

  // Prepare data for second buttons
  const secondButton = defectScreen2.data[0].defectButtonRecords.map((obj) => {
    // Destructure properties from the current object
    const {
      boxColor,
      boxHeight,
      boxWidth,
      boxX,
      boxY,
      labelColor,
      labelText,
      picId,
      buttonId,
      lineX,
      lineY,
    } = obj;

    // Filter partDefects based on buttonId and extract defectName
    const List = defectScreen2.data[0].partDefects.map((obj) => {
      if (obj.buttonId === buttonId) {
        return obj.defectName;
      }
    });

    // Return the prepared data for the current button
    return {
      List,
      boxColor,
      boxHeight,
      boxWidth,
      boxX,
      boxY,
      labelColor,
      labelText,
      picId,
      buttonId,
      lineX,
      lineY,
    };
  });

  // Prepare data for first buttons
  const firstButtons = defectScreen.data[0].defectButtonRecords.map((obj) => {
    // Destructure properties from the current object
    const {
      boxColor,
      boxHeight,
      boxWidth,
      boxX,
      boxY,
      labelColor,
      labelText,
      picId,
      childPicID,
      lineX,
      lineY,
    } = obj;

    // Return the prepared data for the current button
    return {
      boxColor,
      boxHeight,
      boxWidth,
      boxX,
      boxY,
      labelColor,
      labelText,
      picId,
      childPicID,
      lineX,
      lineY,
    };
  });

  // Extract headerData
  const headerData = HeaderData.data[0];

  // Return the prepared data object
  return {
    firstButtons,
    secondButton,
    defectScreen,
    defectScreen2,
    headerData,
  };
};

export default PrepareData;
