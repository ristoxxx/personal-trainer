import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddCustomer(props) {
    const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', city: '', email: '', phone: ''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addCustomer(customer);
        handleClose();
    };

    const inputChanget = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    };

    return(
        <div>
            <Button style={{margin: 10}}  variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >New Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First name"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanget}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Last name"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanget}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanget}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="City"
            name="city"
            value={customer.city}
            onChange={inputChanget}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            name="email"
            value={customer.email}
            onChange={inputChanget}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone"
            name="phone"
            value={customer.phone}
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

export default AddCustomer;