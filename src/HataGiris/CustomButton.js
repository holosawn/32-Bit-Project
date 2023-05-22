import React, { useState , useRef } from "react";
import { Button, Menu, MenuItem , Popper , Box} from "@mui/material";
import {IconButton} from "@mui/material"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ButtonWithMenu = ({options,style,otherProps,setDefect,setPart,label}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const iconRef = useRef(null)
  const [optionss,setOptionss] = useState(options)


  const scrollButtonStyle={minWidth:"110px",border:"1.5px solid #9cdb9e",borderRadius:1}

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPart()
  };

  const handleMenuItemClick = (item) => {
    setDefect(item);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    
    const handleMouseClick= (direction) => {
      const menuList = document.querySelector(".MuiMenu-paper")
      if(menuList){
        menuList.scrollBy({top:(direction == "up" ? -64 : 64 ),behavior:"smooth"})
      }
    }
 
    const handleMouseDown= (direction) =>{
      const menuList = document.querySelector(".MuiMenu-paper")
      if(menuList){
        const scrollStep = direction === "up" ? -16 : 16
        let scrollInterval = setInterval(() => {
          const newScrollTop = menuList.scrollTop + scrollStep
          menuList.scrollTop = newScrollTop
        },16)
      
        iconRef.current= scrollInterval}
      }

    const handleMouseUp= () => {
      clearInterval(iconRef.current)
    }
    
  return (
    <div>
      <Button onClick={handleButtonClick} sx={style} {...otherProps}

        >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       {optionss.map(val => {
             
              return <MenuItem value = {val} onClick={()=> handleMenuItemClick(val)}>{val}</MenuItem>
              })}
      </Menu>

      <Popper open={Boolean(anchorEl)} sx={{zIndex:10000}} anchorEl={anchorEl} placement="right-end" >

            <Box sx={{display:"flex",flexDirection:"column",bgcolor:"#c6ffc8"}}>

              <IconButton sx={scrollButtonStyle}
              onClick={() => handleMouseClick("up")}
              onMouseDown={() => {
                const IntervalId=setTimeout(()=> {
                  handleMouseDown("up")},100)
                  iconRef.current=IntervalId
                    }}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
                    
              <IconButton sx={scrollButtonStyle}
                onClick={()=> handleMouseClick("down")}
                onMouseDown={() => {  
                  const IntervalId=setTimeout(()=> {
                    handleMouseDown("down")},100)
                    iconRef.current=IntervalId
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

export default ButtonWithMenu;
