const prepareData = (data) => {

    const {defectList , nrReasonList} = data
    let id = 0
    const rows = defectList.map(obj => {
        const {assyNo , depCode , bodyNo , vinNo , colorExtCode , rgbCode , modelCode , termId , partName , spotCode , spotgunName , arcnutboltgunName , arcnutboltCode , defectName , defrankCode , formattedDefectHour , defectType , defrespName } = obj
        const colorData = {colorExtCode , rgbCode}
        id ++

        return {id ,assyNo , depCode , bodyNo , vinNo , colorData , modelCode , termId , partName , spotCode , spotgunName , arcnutboltgunName , arcnutboltCode , defectName , defrankCode , formattedDefectHour , defectType , defrespName }
    })


    return rows
}

export default prepareData