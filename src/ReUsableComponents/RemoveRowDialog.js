import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const RemoveRowDialog = ( {removeRow, open, setOpen} ) => {

    setOpen(true)

  const handleRemove = () => {
    removeRow(); // Call the removeRow function when confirmed
    setOpen(false); // Close the dialog
  };

  return (

      <Dialog sx={{position:"absolute"}} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to remove this row?</p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={handleRemove}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    
  );
};

export default RemoveRowDialog;
