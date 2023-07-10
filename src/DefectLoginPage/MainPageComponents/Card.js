import React, { useRef, useEffect, useContext } from 'react';
import { Card, CardMedia, Button, Typography } from "@mui/material";
import { DefectLoginContext } from '../DefectLoginProvider';
import { DataContext } from '../DataProvider';
import { imgBoxTextStyle, imgBoxProps } from '../constants';
import BoxWithMenu from './BoxWithMenu';
import { CustomCursor } from '../constants';

const CanvasAndImage = () => {
  
    const {data, setData} = useContext(DataContext);
    const {imgId, setImgId} = useContext(DefectLoginContext)
    const {currentButtons, setCurrentButtons} = useContext(DefectLoginContext)
    const {defect, setDefect} = useContext(DefectLoginContext)
    const {defectCoords, setDefectCoords} = useContext(DefectLoginContext)
    const {isCoordSelect, setIsCoordSelect} = useContext(DefectLoginContext)
    const {isDrawLines, setDrawLines} = useContext(DefectLoginContext)
    const {images, setImages } = useContext(DefectLoginContext)
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);


  useEffect(() => {
    if (imgId && ctxRef.current === null) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctxRef.current = ctx;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, [images]);

  useEffect(() => {
    eraseLine();
    drawLines();
  }, [currentButtons, isDrawLines]);

  // Fetch data and set initial state
  useEffect(() => {
    setImages((prev) => ({
      ...prev,
      [data.firstButtons[0].picId]:
        "https://vehq.com/wp-content/uploads/2021/08/An-underside-of-a-car-at-the-car-shop.jpg",
      [data.secondButton[0].picId]:
        "https://splashandgocarwash.com/wp-content/uploads/cars-undercarriage-1024x683.jpg",
    }));
    setImgId([data.firstButtons[0].picId]);
    setCurrentButtons(data.firstButtons);

}, []);

  const drawLine = (sx, sy, ex, ey) => {
    if (ctxRef.current !== null) {
      const ctx = ctxRef.current;
      ctx.beginPath();
      ctx.moveTo(sx + 40, sy + 40);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }
  };

  const eraseLine = () => {
    if (ctxRef.current !== null) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const drawLines = () => {
    currentButtons.map((obj) => {
      const { boxX, boxY, lineX, lineY } = obj;
      if (!(lineX === -100 || lineY === -100)) {
        drawLine(boxX, boxY, lineX, lineY);
      }
    });
  };

  const handleFirstButtonClick = (childPicID, color, partName) => {
    setDefect((prev) => ({
      ...prev,
      part: partName,
    }));
  
    if (images[childPicID]) {
      setImgId(childPicID);
      setCurrentButtons(data.secondButton);
      setDrawLines((prev) => !prev);
    }
  
    if (color !== "blue") {
      setDefect({ part: "", defect: "" });
      setIsCoordSelect(true);
      setDrawLines((prev) => !prev);
      setCurrentButtons([]);
    }
  };
  
    // This function handles the click event on the canvas to capture the coordinates.
   const handleCoordClick = (event) => {
    // It takes the event as a parameter and extracts the clientX and clientY properties from it.
            
    const canvas = canvasRef.current
    const canvasRect = canvas.getBoundingClientRect();
    const { pageX, pageY } = event;
    const clientX = pageX - canvasRect.left
    const clientY = pageY - canvasRect.top
    setDefectCoords({ x: clientX, y: clientY });
    // Update the defectCoords state with the captured clientX and clientY coordinates.
   }
    
    // Object with properties for getting coordinates
  // This object defines the properties for the `onGettingCoords` event handler. It sets the cursor style to a custom image and specifies the `onClick` function to handle the click event.
  // The `handleCoordClick` function is called when a click event occurs on the specified element.
  const onGettingCoords = {
    style: { cursor: `url(${CustomCursor}), auto` },
          onClick: (e) => {
            e.preventDefault();
            handleCoordClick(e);
          }
        }
  

  return !(imgId) ? null : (
    <Card sx={{ position: "relative", width: "800px", height: "600px" }} {...(isCoordSelect ? onGettingCoords : {})}>
    <CardMedia
      sx={{ objectFit: "fill", height: "600px" }}
      component={"img"}
      image={images[imgId]}
      alt="car img"
    />
    <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
    {(defect.defect == null) && currentButtons.map(obj => {
      return (!(obj.List)) ? (
        <Button
          key={obj.labelText}
          style={imgBoxProps(obj)}
          onClick={() => {
            handleFirstButtonClick(obj.childPicID, obj.boxColor, obj.labelText)
          }}
        >
          <Typography {...imgBoxTextStyle}>{obj.labelText}</Typography>
        </Button>
      ) : (
        <BoxWithMenu
          key={obj.labelText}
          style={imgBoxProps(obj)}
          setDefect={(defect) => {
            setDefect(prev => ({
              ...prev, defect: defect
            }))
          }}
          extraSelectEventHandler={() => {
            setIsCoordSelect(true)
            eraseLine()
            }}
          options={obj.List}
          label={<Typography {...imgBoxTextStyle}>{obj.labelText}</Typography>}
        />
      )
    })}
    { defectCoords.x && <img src={CustomCursor} style={{position:"absolute", top:defectCoords.y, left:defectCoords.x}}></img>}
  </Card>
  );
}

export default CanvasAndImage;
