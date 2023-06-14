import { useFormikContext, useField } from "formik"
import { MenuItem,Box,Select,Popper,Button} from '@mui/material'
import { useEffect, useState , useRef } from "react"
import {IconButton} from "@mui/material"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const scrollButtonStyle={minWidth:"15vw",border:"1.5px solid #9cdb9e",borderRadius:1}

const CustomSelect = ({name,options,style,isDaySelect,shiftChange,otherProps,defaultValue}) => {
    
    const { values,setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const [isOpen,setIsOpen] = useState(false)
    const selectRef=useRef(null)
    const dropdownRef= useRef(null)
    const [optionss,setOptionss] = useState([...options])

  
    
    useEffect(()=>{
      if(isDaySelect){
        setOptionss(Array.from({length: new Date(values.date.year, values.date.month, 0).getDate()}, (_, i) => i + 1))
      }
    },[values.date.year,values.date.month])
   

    useEffect(()=>{
      if(defaultValue){
        setFieldValue(name,defaultValue)
      }
      if(shiftChange){shiftChange(values.shift)}
    
      },[])

    const modifiedOnChange =shiftChange ? 
    (event) =>{
      setFieldValue(name,event.target.value)
      shiftChange(event.target.value)}
    :(event) =>{
      setFieldValue(name,event.target.value)
    }

    const configSelect = {
      ...field,
      ...otherProps,
      size : "small",
      variant: 'outlined',
      color:(meta.touched && meta.error ? "primary" : "third"),
 
    };
  
    if (meta && meta.touched && meta.error) {
      configSelect.error = true;
    }
    
    const handleMenuMouseClick= (direction) => {
      const menuList = document.querySelector(".MuiMenu-paper")
      if(menuList){
        menuList.scrollBy({top:(direction == "up" ? -64 : 64 ),behavior:"smooth"})
      }
    }
 
    const handleMenuMouseDown= (direction) =>{
      const menuList = document.querySelector(".MuiMenu-paper")
      if(menuList){
        const scrollStep = direction === "up" ? -16 : 16
        console.log(menuList.scrollTop)
        let scrollInterval = setInterval(() => {
          const newScrollTop = menuList.scrollTop + scrollStep
          menuList.scrollTop = newScrollTop
        },16)
      
        selectRef.current= scrollInterval}
      }

    const handleMenuMouseUp= () => {
      clearInterval(selectRef.current)
    }

    return (
      <>
          <Select  sx={{...style}} {...configSelect}
              open={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} 
              ref={dropdownRef} onChange={modifiedOnChange}
              >
              {optionss.map(val => {
              return <MenuItem value = {val} key={val}>{val}</MenuItem>
              })}
          
          </Select>

          <Popper open={isOpen} sx={{zIndex:10000}} anchorEl={dropdownRef.current} placement="right-end" >

            <Box sx={{display:"flex",flexDirection:"column",bgcolor:"#c6ffc8"}}>

              <IconButton sx={scrollButtonStyle}
              onClick={() => handleMenuMouseClick("up")}
              onMouseDown={() => {
                const IntervalId=setTimeout(()=> {
                  handleMenuMouseDown("up")},100)
                  selectRef.current=IntervalId
                    }}
              onMouseUp={handleMenuMouseUp}
              onMouseLeave={handleMenuMouseUp}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
                    
              <IconButton sx={scrollButtonStyle}
                onClick={()=> handleMenuMouseClick("down")}
                onMouseDown={() => {  
                  const IntervalId=setTimeout(()=> {
                    handleMenuMouseDown("down")},100)
                    selectRef.current=IntervalId
                      }}
                onMouseUp={handleMenuMouseUp}
                onMouseLeave={handleMenuMouseUp}              
                >
                <KeyboardArrowDownIcon />
              </IconButton>

            </Box>
          </Popper>
    

      </>
    )
  }
export default CustomSelect