# 32 Bit Frontend Project
This project contains a Frontend application developed for a 32-bit recruitment process. It encompasses a series of functionalities starting from the first page where the user selects a terminal from a table, to the second page where the user can log into the system, the third page where the user specifies the type and other properties of the error, and the fourth page where numereous error records are listed.

# Table of Contents
- **Description**
- **Key Components**
- **Getting Started**
- **Requirements**
- **Installation**
- **Usage**

# Description
This project includes a 32-bit Frontend project designed for use in a recruitment process. It consists of the following components:

- First Page: Provides an interface for users to select a terminal from a bit table.
- Second Page: Allows users to log into the system.
- Third Page: Provides an interface for users to specify the type, location, and other details of the error.
- Fourth Page: Displays a list of numerous error records.

The main objective of this project is to recruit students while simultaneously providing them with important experiences and learning opportunities.

# Key Components
The key components of the project are as follows:
# 1. CustomInput Component
The `CustomInput` component is a reusable form input component that provides enhanced functionality and styling for text fields. It extends the `TextField` component from the Material-UI library.

### Usage
To use the `CustomInput` component, you need to import it and include it in your form or component. Here's an example of how you can use it:

```jsx
import CustomInput from './CustomInput';

// Inside your component
<CustomInput
  label="Name"
  name="name"
  value={values.name}
  onChange={handleChange}
  extraOnChange={handleExtraChange}
  style={{ width: '100%' }}
/>
```

## Props
The CustomInput component accepts the following props:

- **label (string, required):** The label for the input field.
- **name (string, required):** The name of the input field, used for formik integration.
- **value (any):** The current value of the input field.
- **onChange (function):** The onChange event handler for the input field.
- **extraOnChange (function):** An additional onChange event handler for the input field, provided by the parent component.
- **style (object):** Additional inline styles to be applied to the input field.
  
## Features
- Enhanced styling: The CustomInput component provides a custom outline color when the input field is touched and has an error.
- Integration with Formik: It integrates seamlessly with Formik to handle form state and validation.
- Additional onChange event: The component supports an extra onChange event handler, allowing you to perform additional actions when the input value changes.

  

# 2. CustomSelect Component
The CustomSelect component is a customized select input component built with Formik and Material-UI (MUI). It provides additional functionality such as scrolling through options and dynamically updating options based on selected values.

### Installation
To use the CustomSelect component, you need to have Formik, Material-UI, React, and React-DOM installed in your project. You can install them using npm or yarn:

```bash
npm install formik @mui/material react react-dom
```
### Usage
Use the CustomSelect component in your form:

```jsx
import CustomSelect from './CustomSelect';

<Formik>
  <Form>
    <CustomSelect
      name="fieldName"
      options={[...]}
      style={{ ... }}
      isDaySelect={true}
      shiftChange={...}
      defaultValue={...}
      isOptional={false}
      {...otherProps}
    />
  </Form>
</Formik>
```

### Replace the following props with appropriate values:
- **name:** The name of the field, used for identifying the field in Formik.
- **options:** An array of options to be displayed in the select component.
- **style:** Custom styles to be applied to the select component.
- **isDaySelect:** Boolean value indicating whether the select component is used for selecting days.
- **shiftChange:** Optional function to be called when the shift value changes.
- **defaultValue:** Optional default value for the select component.
- **isOptional:** Boolean value indicating whether the select component is optional.
- **otherProp:** Any additional props you want to pass to the select component.

### Functionality
The CustomSelect component provides the following functionality:

- Displays a select component with options.
- Dynamically updates options based on selected values (year and month).
- Scrolls through the menu list with scroll buttons (up and down).
- Calls the shiftChange function when the shift value changes (if provided).
- Handles validation and error messages using Formik and MUI.


# 3. VirtualKeyboard Component
The VirtualKeyboard component renders a virtual keyboard using the react-simple-keyboard library. It provides an interface for users to input text using a virtual keyboard.

## Installation
To use the VirtualKeyboard component, you need to have react and react-dom installed in your project. You also need to install the react-simple-keyboard library. You can install them using npm or yarn:

```bash
npm install react react-dom react-simple-keyboard
```
### Usage
```jsx
Import the VirtualKeyboard component into your file:
```
```jsx
import VirtualKeyboard from './VirtualKeyboard';
Use the VirtualKeyboard component in your React component:
jsx
Copy code
const MyComponent = () => {
  const keyboardRef = useRef(null);

  const handleKeyboardChange = (input) => {
    // Handle the input change from the virtual keyboard
    console.log(input);
  };

  return (
    <div>
      <input type="text" />
      <VirtualKeyboard
        keyboardRef={keyboardRef}
        inputName="inputName"
        onChangeAll={handleKeyboardChange}
      />
    </div>
  );
};
```
Replace the following props with appropriate values:
- **keyboardRef:** A reference object to store the keyboard instance.
- **inputName:** The name of the input field associated with the keyboard.
- **onChangeAll:** A callback function triggered when any key is pressed on the keyboard.

## Functionality
The VirtualKeyboard component provides the following functionality:

- Renders a virtual keyboard using the react-simple-keyboard library.
- Toggles between the default and shift layouts when the Shift or Caps Lock key is pressed.
- Handles key press events on the virtual keyboard.
- Calls the onChangeAll function with the input value whenever a key is pressed on the keyboard.


# 4. VirtualTable Component

The VirtualTable component is a lightweight and efficient table implementation for virtualized rendering. It is designed to handle large datasets and optimize performance by rendering only the visible rows and columns.

## Features

- **Efficient rendering:** Renders only the visible rows and columns, improving performance for large datasets.
- **Virtualization:** Supports virtualization by dynamically loading data as the user scrolls.
- **Customizable:** Provides options for customizing the appearance and behavior of the table.
- **Sorting and filtering:** Allows sorting and filtering of the table data.
- **Event handling:** Supports various events for interacting with the table, such as row selection, cell click, and more.

## Installation

You can install the VirtualTable component via npm:

```bash
npm install virtual-table
```

### Usage
To use the VirtualTable component in your project, import it and render it with the appropriate props.

```jsx
import React from 'react';
import VirtualTable from 'virtual-table';

const MyTable = () => {
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Age', field: 'age' },
    // Add more column definitions as needed
  ];

  const data = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
    // Add more data rows as needed
  ];

  return (
    <VirtualTable
      columns={columns}
      data={data}
      // Add additional props as needed
    />
  );
};

export default MyTable;
```
## Functionality
The VirtualTable component provides the following functionality:

- **columns:** An array that contains the configurations of table columns. Each column configuration should be an object with title and field properties. title represents the column header, while field specifies the corresponding field in the data source.

- **data:** An array that contains the data to be displayed in the table. Each item should be an object representing a row in the table. You should adjust the data structure according to the requirements of your project.

- **nrReasonList:** An array that contains NR (Not Responding) reasons. This parameter can be used to populate a special field in the table.

- **tableRef:**  A reference to the table component. This reference can be used to programmatically access the table component and perform certain operations.

For example, when using the component, you can do it as follows:

```jsx
<VirtualTable
  columns={columns}
  data={data}
  nrReasonList={nrReasonList}
  tableRef={tableRef}
/>
```


# Getting Started
In this section, you can find the steps to run the project on your local environment.

# Requirements
The project requires the following dependencies:

## Dependencies
```jsx
@emotion/react: ^11.10.6
@emotion/styled: ^11.10.6
@fontsource/roboto: ^4.5.8
@mui/icons-material ^5.11.16
@mui/material: ^5.11.16
@testing-library/jest-dom: ^5.16.5
@testing-library/react: ^13.4.0
@testing-library/user-event: ^13.5.0
axios: ^1.3.5
formik: ^2.2.9
i18next: ^23.1.0
json-loader: ^0.5.7
react: ^18.2.0
react-dom: ^18.2.0
react-router-dom: ^6.10.0
react-scripts: 5.0.1
react-simple-keyboard: ^3.5.69
react-virtuoso: ^4.3.8
react-window: ^1.8.9
save: ^2.9.0
simple-keyboard-layouts: ^3.1.319
web-vitals: ^2.1.4
yup: ^1.0.2
```
# Installation
Clone the project from GitHub:

```
$ git clone https://github.com/user/project.git
```

Navigate to the project directory:

```
$ cd project
```

Install the necessary dependencies:

```
$ yarn install
```
or
```
$ npm install
```

Start the project:

```
$ yarn start
```
or
```
$ npm start
```

Open http://localhost:3000 in your browser to see the project running.

# Usage
The usage of this project is straightforward. The project, running in your browser, has different pages that encompass different stages of the 32-bit recruitment process. By navigating through the relevant pages, users can select a terminal from the bit table, log into the system, specify the type and location of the error, and list the error records.

