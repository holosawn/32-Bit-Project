import { useFormikContext, useField } from "formik"
import { MenuItem,Box,Select,Popper,Button} from '@mui/material'
import { useEffect, useState , useRef } from "react"
import {IconButton} from "@mui/material"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const scrollButtonStyle={minWidth:"15vw",border:"1.5px solid #9cdb9e",borderRadius:1}

const CustomSelect = ({name,options,style,isDaySelect,otherProps,defaultValue}) => {
    
    const { values,setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const [isOpen,setIsOpen] = useState(false)
    const selectRef=useRef(null)
    const dropdownRef= useRef(null)
    const [optionss,setOptionss] = useState([...options])
    
      useEffect(()=>{
        if(isDaySelect){
          setOptionss(Array.from({length: new Date(values.tarih.year, values.tarih.month, 0).getDate()}, (_, i) => i + 1))
        }
      },[values.tarih.year,values.tarih.month])
   

    const handleChange = evt => {
      const { value } = evt.target;
      setFieldValue(name, value);
    };

    useEffect(()=>{
      if(defaultValue){
        setFieldValue(name,defaultValue)
      }else{
        setFieldValue(name,optionss[0])
      }},[])


    const configSelect = {
      ...field,
      ...otherProps,
      size : "small",
      variant: 'outlined',
      color:(meta.touched && meta.error ? "primary" : "third"),
      onChange: handleChange
    };
  
    if (meta && meta.touched && meta.error) {
      configSelect.error = true;
    }
    
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
      
        selectRef.current= scrollInterval}
      }

    const handleMouseUp= () => {
      clearInterval(selectRef.current)
    }

    return (
      <>
        <Box>

          <Select defaultValue={optionss[0]} sx={{...style}} {...configSelect}
              open={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} 
              ref={dropdownRef}
              >
              {optionss.map(val => {
              return <MenuItem value = {val} >{val}</MenuItem>
              })}
          
          </Select>

          <Popper open={isOpen} sx={{zIndex:10000}} anchorEl={dropdownRef.current} placement="right-end" >

            <Box sx={{display:"flex",flexDirection:"column",bgcolor:"#c6ffc8"}}>

              <IconButton sx={scrollButtonStyle}
              onClick={() => handleMouseClick("up")}
              onMouseDown={() => {
                const IntervalId=setTimeout(()=> {
                  handleMouseDown("up")},100)
                  selectRef.current=IntervalId
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
                    selectRef.current=IntervalId
                      }}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}              
                >
                <KeyboardArrowDownIcon />
              </IconButton>

            </Box>
          </Popper>
        </Box>  

      </>
    )
  }
export default CustomSelect