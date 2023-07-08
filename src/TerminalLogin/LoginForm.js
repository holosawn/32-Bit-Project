    import {InputLabel} from '@mui/material'
    import {React } from 'react'
    import {Button, Box} from "@mui/material"
    import { Formik, Form} from "formik"
    import * as yup from "yup"
    import CustomInput from '../ReUsableComponents/Custominput'
    import CustomSelect from '../ReUsableComponents/CustomSelect'
    import { labelStyle, buttonBoxStyle, buttonStyle,FormBox, formBoxStyle, mainInputStyle } from './constants'


    // Initial values for the form fields
	const initialValues = {
        terminal: "",
        sicil: "",
        password: "",
        assy: "",
        date: {
        year: "",
        month: "",
        day: "",
        },
        shift: "",
    };
    // ValidationSchema for the form fields
    const validationSchema = yup.object().shape({
        terminal: yup
        .string()
        .required(),
        sicil: yup
        .string()
        .min(3, "Username must be at least 3 characters long")
        .required(),
        password:yup
        .string()
        .required(),
        montaj:yup
        .string()
        .required(),
        date: yup.object().shape({
            year: yup.number().required(),
            month: yup.number().required(),
            day: yup.number().required()
        }),
        shift:yup
        .string()
        .required()
    })

    const LoginForm = ({ onSubmit, navigate, setShiftColor, getInputValue, setInputName, onChangeInput, terminalOptions, shiftColor, ShiftOptions }) => {
    
    return (
        <FormBox >
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}	
            onSubmit={onSubmit}
        >
            {({ isSubmitting}) => (
            <Form>

            {/*Rendering Terminal select */}
            <Box sx={formBoxStyle} overflow={"auto"}>  
                <InputLabel  sx={{...labelStyle}}>
                    Terminal Listesi
                </InputLabel>
                <CustomSelect
                name="terminal"
                options={terminalOptions}
                style={mainInputStyle}
                placeholder="Terminal"
                />
            </Box>
            
            {/*rendering Sicil input*/}
            <Box sx={formBoxStyle} overflow={"auto"}>
                <InputLabel sx={labelStyle}>
                    Sicil No
                </InputLabel>
                <CustomInput
                name="sicil"
                type="text"
                value={getInputValue("sicil")}
                onFocus={() => setInputName("sicil")}
                extraOnChange={onChangeInput}	
                placeholder="Sicil No"
                style={mainInputStyle}		
                    
                />
            </Box>
                {/*Rendering password input*/}
            <Box sx={formBoxStyle} overflow={"auto"}>
                <InputLabel sx={labelStyle}>
                    Şifre
                </InputLabel>
                <CustomInput
                name="password"
                type="password"value={getInputValue("password")}
                onFocus={() => setInputName("password")}
                extraOnChange={onChangeInput}	
                placeholder="Şifre"	
                style={mainInputStyle}		  
                />
            </Box>
                {/*Rendering Assy No input*/}
            <Box sx={formBoxStyle} overflow={"auto"}>
                <InputLabel sx={labelStyle}>
                    Montaj No
                </InputLabel>
                <CustomInput
                name="montaj"
                type="text"
                value={getInputValue("montaj")}
                onFocus={() => setInputName("montaj")}
                extraOnChange={onChangeInput}	
                placeholder="Montaj No"	
                style={mainInputStyle}		  
                
                />
            </Box>

                {/*Rendering Date Select inputs*/}
            <Box sx={{backgroundColor: `${shiftColor}`,...formBoxStyle, flexDirection:{xs:"column",md:"row"}, borderRadius:1}} overflow={"auto"}>

                <Box sx={{display:"flex",flexDirection:"row"}}>
                    <InputLabel sx={labelStyle}>
                        Tarih
                    </InputLabel>
                
                        <CustomSelect
                        name="date.day"
                        isDaySelect={true}
                        options={Array.from({length: new Date(initialValues.date.year, initialValues.date.month, 0).getDate()}, (_, i) => i + 1)}
                        defaultValue={new Date().getDate()}
                        style={{...mainInputStyle,minWidth:"66px",margin:0.25}}
                        
                        />
                        <CustomSelect
                        name="date.month"
                        options={Array.from({length: 12}, (_, i) => i + 1)}
                        defaultValue={new Date().getMonth() + 1}
                        style={{...mainInputStyle,minWidth:"66px",margin:0.25}}
                        />
                        <CustomSelect
                        name="date.year"
                        options={[2022,2023,2021,2020,2019,2018,2017,2016,2015,2014,2013]}
                        defaultValue={new Date().getFullYear()}
                        style={{...mainInputStyle,minWidth:"85px",margin:0.25}}
                        />
                </Box>
                {/*Rendering Shift select input*/}
                <Box sx={{display:"flex",flexDirection:"row"}}>
                        <InputLabel sx={{...labelStyle,
                            minWidth:{xs:0,md:"25px"},
                            marginInlineStart:{xs:0,md:1.35},
                            marginInlineEnd:{xs:11,md:1.5},
                        }}>
                            Shift
                        </InputLabel>
                        <CustomSelect
                        name="shift"
                        shiftChange={shift => {
                            setShiftColor(ShiftOptions.find(obj => obj.shiftCode === shift).rgbColor)
                            }}
                        options={
                            ShiftOptions.map(obj => {
                                const {shiftCode } = obj 
                                return shiftCode 
                            })}
                        style={{...mainInputStyle,minWidth:"20px",margin:0.25}}
                        />
                </Box>
                
            </Box>
            {/*Rendering Login and Back buttons*/}
            <Box sx={buttonBoxStyle}>
                <Button sx={{...buttonStyle,backgroundColor:"#0f0f0f"}} disabled={isSubmitting} variant='contained' type="submit">
                Giriş yap
                </Button>
                <Button sx={buttonStyle} variant='contained' onClick={() => navigate(-1)}>
                Geri
                </Button>
            </Box>
            </Form>
            )}

        </Formik>
        </FormBox>
    );
    };

    export default LoginForm;
