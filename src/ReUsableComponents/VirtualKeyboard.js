import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css"
import Tur from "simple-keyboard-layouts/build/layouts/turkish";
import en from  "simple-keyboard-layouts/build/layouts/english"
import { useTranslation } from 'react-i18next';
/**
 * VirtualKeyboard component renders a virtual keyboard using react-simple-keyboard library.
 *
 * @param {object} props - The component props.
 * @param {object} props.keyboardRef - Reference object to store the keyboard instance.
 * @param {string} props.inputName - The name of the input field associated with the keyboard.
 * @param {function} props.onChangeAll - Callback function triggered when any key is pressed on the keyboard.
 */
const VirtualKeyboard = ({ keyboardRef, inputName, onChangeAll }) => {
  // State to track the current layout of the keyboard
  const [layoutName, setLayoutName] = useState('default');
  const { t } = useTranslation()

  
  /**
   * Event handler for the Shift key on the virtual keyboard.
   * Toggles between the 'default' and 'shift' layouts.
   */
  const handleShift = () => {
    // Determine the new layout name based on the current layout
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
    setLayoutName(newLayoutName);
  };

  /**
   * Event handler for key press events on the virtual keyboard.
   * Handles special keys like Shift and Caps Lock.
   */
  const onKeyPress = (button) => {
    if (button === '{shift}' || button === '{lock}') {
      // Toggle Shift layout when Shift or Caps Lock key is pressed
      handleShift();
    }
  };

    const layout= t("keyboardLayout") === "en" ? {...en} : {...Tur}

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1000px", width: "100%" }}>
        {/* Render the virtual keyboard component */}
        <Keyboard
          {...layout}
          keyboardRef={(r) => (keyboardRef.current = r)}
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
