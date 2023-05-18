import {React , useState , useEffect , useRef} from 'react';
import {Box, Card, CardMedia, Checkbox, Container, TextField, Button } from "@mui/material"
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import styled from '@emotion/styled';
import axios from "axios"
import {firstButtons,secondButton,Veri,Veri2} from './data';
import ButtonWithMenu from './CustomButton';


const PopperMenu = () => {




  return (
    <Box >
        <Box sx={{display:"flex" , flexDirection:"column" , justifyContent:"center"}}>
            <Box>

              <Box>
                <Typography>
                  Hata Sorumlusu
                </Typography>
                <Select>

                </Select>
              </Box>

              <Box>
                <Typography>
                  Hata Sınıfı
                </Typography>
                <Select>

                </Select>
              </Box>

              <Box>
                <Typography>
                  Exit Department
                </Typography>
                <Select>

                </Select>
              </Box>

            </Box>

            <Box>

            </Box>
        </Box>

        <Box>

        </Box>
    </Box>
  )
}