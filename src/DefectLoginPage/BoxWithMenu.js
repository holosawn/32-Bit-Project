import React, { useState , useRef } from "react";
import { Button, Menu, MenuItem , Popper , Box} from "@mui/material";
import {IconButton} from "@mui/material"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BoxWithMenu = ({options,style,otherProps,setDefect,label}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const iconRef = useRef(null)
  const [optionss,setOptionss] = useState(options)


  // Style for the scroll button
const scrollButtonStyle = {
  minWidth: "110px",
  border: "1.5px solid #9cdb9e",
  borderRadius: 1,
};

// Event handler for the button click
const handleButtonClick = (event) => {
  setAnchorEl(event.currentTarget);
};

// Event handler for the menu item click
const handleMenuItemClick = (item) => {
  setDefect(item);
  setAnchorEl(null);
};

  // Function to close the menu by setting the anchor element to null
const handleClose = () => {
  setAnchorEl(null);
};

  // Function to handle scrolling the menu on mouse click
const handleMouseClick = (direction) => {
  const menuList = document.querySelector(".MuiMenu-paper");
  if (menuList) {
    // Scroll the menu by a certain amount based on the direction
    menuList.scrollBy({
      top: direction === "up" ? -64 : 64,
      behavior: "smooth",
    });
  }
};

  // Function to handle continuous scrolling while the mouse is pressed down
const handleMouseDown = (direction) => {
  const menuList = document.querySelector(".MuiMenu-paper");
  if (menuList) {
    // Calculate the scroll step based on the direction
    const scrollStep = direction === "up" ? -16 : 16;
    // Start a scroll interval to continuously scroll the menu
    let scrollInterval = setInterval(() => {
      const newScrollTop = menuList.scrollTop + scrollStep;
      menuList.scrollTop = newScrollTop;
    }, 16);

    // Store the scroll interval in the iconRef
    iconRef.current = scrollInterval;
  }
};

  // Function to stop continuous scrolling when the mouse is released
const handleMouseUp = () => {
  clearInterval(iconRef.current);
};


    
return (
  <div>
    {/* Box */}
    <Button onClick={handleButtonClick} sx={style} {...otherProps}>
      {label}
    </Button>

    {/* Menu */}
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {/* Menu Items */}
      {optionss.map((val, index) => {
        return (
          <MenuItem value={val} key={index} onClick={() => handleMenuItemClick(val)}>
            {val}
          </MenuItem>
        );
      })}
    </Menu>

    {/* Popper which contains scroll buttons */}
    <Popper open={Boolean(anchorEl)} sx={{ zIndex: 10000 }} anchorEl={anchorEl} placement="right-end">
      {/* Scroll buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "#c6ffc8" }}>
        {/* Scroll Up Button */}
        <IconButton
          sx={scrollButtonStyle}
          onClick={() => handleMouseClick("up")}
          onMouseDown={() => {
            const IntervalId = setTimeout(() => {
              handleMouseDown("up");
            }, 100);
            iconRef.current = IntervalId;
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <KeyboardArrowUpIcon />
        </IconButton>

        {/* Scroll Down Button */}
        <IconButton
          sx={scrollButtonStyle}
          onClick={() => handleMouseClick("down")}
          onMouseDown={() => {
            const IntervalId = setTimeout(() => {
              handleMouseDown("down");
            }, 100);
            iconRef.current = IntervalId;
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Popper>
  </div>
);

};

export default BoxWithMenu;
