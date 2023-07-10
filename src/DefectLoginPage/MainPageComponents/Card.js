import React, { useRef, useEffect, useContext } from 'react';
import { Card, CardMedia, Button, Typography } from "@mui/material";
import { DefectLoginContext } from '../DefectLoginProvider';
import { DataContext } from '../DataProvider';
import { imgBoxTextStyle, imgBoxProps } from '../constants';
import BoxWithMenu from './BoxWithMenu';

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

  //Initialize cursor image
    const CustomCursor = "data:image/png;base64,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"

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
