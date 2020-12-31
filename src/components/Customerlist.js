import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';


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
        fetch(params.value[0].href, {
            method: 'DELETE'
        })
        .then(_ => getCustomers())
        .then(_ => handleOpen())
        console.log(params.value[0].href);
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err)) 
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
          method: 'PUT',
          headers: {
              'Content-type' : 'application/json'
          },
          body: JSON.stringify(customer)  
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
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
            field: 'links',
            width: 70,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
            
        },
        {
            headerName: '',
            field: 'links',
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
            <h1>Customer list</h1>
        <AddCustomer addCustomer={addCustomer}/>
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
            message="Customer deleted succesfully"

        />
    </div>
    );
}

export default Customerlist;

