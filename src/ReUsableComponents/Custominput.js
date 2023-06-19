import { useField, useFormikContext } from "formik";
import { TextField } from "@mui/material";
import { useEffect } from "react";

// Helper function to define outline color
const outlineColor = (color) => {
  return {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: color,
    },
  };
};

// CustomInput component
const CustomInput = ({ label, extraOnChange, style, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  // New onChange event with extraOnChange function which is a prop
  const newOnChange = (event) => {
    setFieldValue(props.name, event.target.value);
    extraOnChange(event);
  };

  // Set initial field value on component mount or when props.value changes
  useEffect(() => {
    setFieldValue(props.name, props.value);
  }, [props.value]);

  return (
    <>
    
      <TextField
        sx={{
          ...style,
          ...(meta.touched && meta.error ? outlineColor("#ff0000") : null),
          backgroundColor: "white",
        }}
        color="third"
        size="small"
        {...field}
        {...props}
        onChange={newOnChange}
      />
    </>
  );
};

export default CustomInput;
