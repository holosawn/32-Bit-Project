const prepareData = (data) => {

    const {defectList , nrReasonList} = data
    let id = 0
    const rows = defectList.map(obj => {
        const {formattedAssyNo , depCode , formattedBodyNo , vinNo , colorExtCode , rgbCode , modelCode , termId , partName , spotCode , spotgunName , arcnutboltgunName , arcnutboltCode , defectName , defrankCode , formattedDefectHour , defectType , defrespName , defectReason} = obj
        const colorData = {colorExtCode , rgbCode}
        id ++

        return {id ,formattedAssyNo , depCode , formattedBodyNo , vinNo , colorData , modelCode , termId , partName , spotCode , spotgunName , arcnutboltgunName , arcnutboltCode , defectName , defrankCode , formattedDefectHour , defectType , defrespName , defectReason }
    })

    return {rows,nrReasonList}
}

export default prepareData