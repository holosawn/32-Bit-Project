import { useFormikContext, useField } from "formik";
import { MenuItem, Box, Select, Popper, IconButton } from '@mui/material';
import { useEffect, useState, useRef } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Style for scroll buttons
const scrollButtonStyle = {
  minWidth: "15vw",
  border: "1.5px solid #9cdb9e",
  borderRadius: 1,
};

const CustomSelect = ({ name, options, style, isDaySelect, shiftChange, defaultValue, isOptional, ...otherProps }) => {
  
  const { values, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dayOptions, setDayOptions] = useState([...options]);

    // Set default field value if not optional
  useEffect(() => {
    if (!isOptional) {

      if (defaultValue) {
        //If there is a default value activate onChange function with defaultValue
        modifiedOnChange(defaultValue)
      } 
      else{
        //If there is not a default value activate onChange function with first value of options array
        modifiedOnChange(options[0]);
      }
    }
  }, [])
    
    // Update options when isDaySelect is true and either year or month changes
  useEffect(() => {
    if (isDaySelect) {
      setDayOptions(Array.from({ length: new Date(values.date.year, values.date.month, 0).getDate() }, (_, i) => i + 1));
    }
  }, [values])

  
      // Create new onChange function
  const modifiedOnChange = shiftChange ?
    (value) => {
      //uptade field value and activate shiftChange function if threre is a shiftChange function
      setFieldValue(name, value);
      shiftChange(value);
    } :
    (value) => {
      // Update field value
      setFieldValue(name, value);
    };

      //props to pass into select component
  const configSelect = {
    ...field,
    ...otherProps,
    size: "small",
    variant: 'outlined',
    color: (meta.touched && meta.error ? "primary" : "third"),
  };
  
    // Set error flag for configSelect
  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
  }
  
      // Scroll the menu list by a fixed amount in the specified direction
  const handleScrollMouseClick = (direction) => {
    const menuList = document.querySelector(".MuiMenu-paper");
    if (menuList) {
      menuList.scrollBy({ top: (direction == "up" ? -64 : 64), behavior: "smooth" });
    }
  };
  
      // Start scrolling continuously in the specified direction
  const handleScrollMouseDown = (direction) => {
    const menuList = document.querySelector(".MuiMenu-paper");
    if (menuList) {
      const scrollStep = direction === "up" ? -16 : 16;
      let scrollInterval = setInterval(() => {
        const newScrollTop = menuList.scrollTop + scrollStep;
        menuList.scrollTop = newScrollTop;
      }, 16);
      selectRef.current = scrollInterval;
    }
  };
  
    // Stop scrolling when the mouse button is released
  const handleScrollMouseUp = () => {
    clearInterval(selectRef.current);
  };
  

    return (
      <>
          <Select  
              sx={{...style, backgroundColor:"white"}} 
              {...configSelect}
              open={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} 
              ref={dropdownRef} 
              onChange={(event) => modifiedOnChange(event.target.value)}
              >
              {dayOptions.map(val => {
              return <MenuItem value = {val} key={val}>{val}</MenuItem>
              })}
          
          </Select>

          <Popper open={isOpen} sx={{zIndex:10000}} anchorEl={dropdownRef.current} placement="right-end" >

            <Box sx={{display:"flex",flexDirection:"column",bgcolor:"#c6ffc8"}}>

              <IconButton sx={scrollButtonStyle}
              onClick={() => handleScrollMouseClick("up")}
              onMouseDown={() => {
                const IntervalId=setTimeout(()=> {
                  handleScrollMouseDown("up")},100)
                  selectRef.current=IntervalId
                    }}
              onMouseUp={handleScrollMouseUp}
              onMouseLeave={handleScrollMouseUp}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
                    
              <IconButton sx={scrollButtonStyle}
                onClick={()=> handleScrollMouseClick("down")}
                onMouseDown={() => {  
                  const IntervalId=setTimeout(()=> {
                    handleScrollMouseDown("down")},100)
                    selectRef.current=IntervalId
                      }}
                onMouseUp={handleScrollMouseUp}
                onMouseLeave={handleScrollMouseUp}              
                >
                <KeyboardArrowDownIcon />
              </IconButton>

            </Box>
          </Popper>
    

      </>
    )
  }
export default CustomSelect