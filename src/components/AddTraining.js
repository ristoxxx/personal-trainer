import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


function AddTraining(props) {
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customer: ''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setTraining({...training, customer: props.params.value[0].href});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    };

    const inputChanget = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    };

    return(
        <div>
            <Button style={{margin: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >New training</DialogTitle>
        <DialogContent>
        

          <TextField
            autoFocus
            margin="dense"
            label="Date"
            name="date"
            type="datetime-local"
            value={training.date}
            onChange={inputChanget}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Duration"
            name="duration"
            value={training.duration}
            onChange={inputChanget}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={inputChanget}
            fullWidth
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

        </div>
        )
}

export default AddTraining;