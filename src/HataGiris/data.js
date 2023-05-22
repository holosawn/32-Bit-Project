import { DefectPage } from "../datas";
const {HeaderData , defectScreen , defectScreen2 , errorLoginFields , errorLoginReasons } = DefectPage

const secondButton = defectScreen2.data[0].defectButtonRecords.map((obj) => {
  const { boxColor, boxHeight, boxWidth, boxX, boxY, labelColor, labelText , picId , buttonId , lineX , lineY} =
    obj;

const List = defectScreen2.data[0].partDefects.map(obj => {
  if(obj.buttonId = buttonId){
    return obj.defectName
  }
  })

  return {List , boxColor, boxHeight, boxWidth, boxX, boxY, labelColor, labelText , picId , buttonId , lineX , lineY};
});

const firstButtons = defectScreen.data[0].defectButtonRecords.map((obj) => {
  const { boxColor, boxHeight, boxWidth, boxX, boxY, labelColor, labelText , picId , childPicID , lineX , lineY} =
    obj;
  return { boxColor, boxHeight, boxWidth, boxX, boxY, labelColor, labelText , picId , childPicID , lineX , lineY};
});

const headerData = HeaderData.data[0]

export {firstButtons,secondButton , defectScreen , defectScreen2 , headerData , errorLoginFields , errorLoginReasons}
