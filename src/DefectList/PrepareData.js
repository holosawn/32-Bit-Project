const prepareData = (data) => {

    const {defectList , nrReasonList} = data
    let id = 0
    const rows = defectList.map(obj => {
        const {formattedAssyNo , depCode , depId , formattedBodyNo , vinNo , colorExtCode , rgbCode , modelCode , termId , partName , spotCode , spotgunName , arcnutboltgunName , arcnutboltCode , defectName , defrankCode , formattedDefectHour , defectType , defrespName , defectReason} = obj
        const colorData = {colorExtCode , rgbCode}
        id ++

        return {id ,formattedAssyNo , depCode , depId , formattedBodyNo , vinNo , colorData , modelCode , termId , partName , spotCode , spotgunName , arcnutboltgunName , arcnutboltCode , defectName , defrankCode , formattedDefectHour , defectType , defrespName , defectReason }
    })

    rows.sort((a) => {
        if(a.depId === 94){
            return -1
        }else{
            return 1
        }
    })
    

    return {rows,nrReasonList}
}

export default prepareData