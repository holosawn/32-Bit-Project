import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

// This component represents a dialog for removing a row
const RemoveRowDialog = ({ removeRow, open, setOpen }) => {
  // Set the open state to true to open the dialog initially
  setOpen(true);

  // Handle the remove button click
  const handleRemove = () => {
    removeRow(); // Call the removeRow function to perform the removal
    setOpen(false); // Close the dialog by setting open state to false
  };

  return (
    
    <Dialog sx={{ position: "absolute" }} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Doğrulama</DialogTitle>
      <DialogContent>
        <p>Bu satırdaki verileri silmek istediğine emin misin?</p>
      </DialogContent>
      
      <DialogActions>
        {/*Delete and cancel buttons*/}
        <Button variant="contained" onClick={() => setOpen(false)}>
          İptal
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveRowDialog;
