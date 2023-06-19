const prepareData = (data) => {
    // Destructure the data object to extract defectList and nrReasonList
    const { defectList, nrReasonList } = data;
    let id = 0;
  
    // Map through the defectList and format the data for each row
    const rows = defectList.map((obj) => {
      const {
        formattedAssyNo,
        depCode,
        depId,
        formattedBodyNo,
        vinNo,
        colorExtCode,
        rgbCode,
        modelCode,
        termId,
        partName,
        spotCode,
        spotgunName,
        arcnutboltgunName,
        arcnutboltCode,
        defectName,
        defrankCode,
        formattedDefectHour,
        defectType,
        defrespName,
        defectReason
      } = obj;
  
      // Create a colorData object with colorExtCode and rgbCode
      const colorData = { colorExtCode, rgbCode };
      id++;
  
      // Return the formatted row object
      return {
        id,
        formattedAssyNo,
        depCode,
        depId,
        formattedBodyNo,
        vinNo,
        colorData,
        modelCode,
        termId,
        partName,
        spotCode,
        spotgunName,
        arcnutboltgunName,
        arcnutboltCode,
        defectName,
        defrankCode,
        formattedDefectHour,
        defectType,
        defrespName,
        defectReason
      };
    });
  
    // Sort the rows based on depId, with depId 94 appearing first
    rows.sort((a) => {
      if (a.depId === 94) {
        return -1;
      } else {
        return 1;
      }
    });
  
    // Return the prepared data object with rows and nrReasonList
    return { rows, nrReasonList };
  };
  
  export default prepareData;
  