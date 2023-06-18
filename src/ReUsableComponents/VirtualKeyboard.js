import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css"

const VirtualKeyboard = ({keyboardRef , inputName , onChangeAll}) => {
  const [layoutName, setLayoutName] = useState('default')

  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default'
    setLayoutName(newLayoutName);
  };

  const onKeyPress = button => {
    if (button === '{shift}' || button === '{lock}') {
      handleShift();
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <div style={{maxWidth:"1000px", width:"100%"}}>
        <Keyboard
          keyboardRef={r => (keyboardRef.current = r)}
          inputName={inputName}
          layoutName={layoutName}
          onKeyPress={onKeyPress}
          onChangeAll={onChangeAll}
        />
      </div>
    </div>
  );
};

export default VirtualKeyboard;
