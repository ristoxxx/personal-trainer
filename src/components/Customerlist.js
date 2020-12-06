import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


function Customerlist () {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCustomers();
    }, [])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if (window.confirm("Are your sure?")) {
        fetch(params.value, {
            method: 'DELETE'
        })
        .then(_ => getCustomers())
        .then(_ => handleOpen())
        console.log(params.value);
        }
    }

    const columns = [
        {headerName: 'First name',field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name',field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street address',field: 'streetaddress', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            field: '_links.self.href',
            width: 90,
            cellRendererFramework: params => 
            <IconButton color="secondary" onClick={() => deleteCustomer(params)}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        }
    ]

    return (
    <div>
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination="true"
            paginationPageSize="10"
            >

        </AgGridReact>
        </div>
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={2020}
            message="Car deleted succesfully"

        />
    </div>
    );
}

export default Customerlist;

