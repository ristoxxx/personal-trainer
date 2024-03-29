import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
//import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Trainigslist () {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTrainings();
    }, [])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        //.then(trainings => setTrainings({...trainings, date: moment(trainings.date).format('MM-DD-YYYY')}))
        .catch(err => console.error(err))
    }

    const deleteTraining = (params) => {
        if (window.confirm("Are your sure?")) {
        fetch(params.value[0].href, {
            method: 'DELETE'
        })
        .then(_ => getTrainings())
        .then(_ => handleOpen())
        console.log(params.value[0].href);
        }
    }

    

    const columns = [
        {field: 'date', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {
            headerName: '',
            field: 'links',
            width: 90,
            cellRendererFramework: params => 
            <IconButton color="secondary" onClick={() => deleteTraining(params)}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        }
    ]

    return (
    <div>
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <h1>Trainings list</h1>
        <AgGridReact
            rowData={trainings}
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
            message="Training deleted succesfully"

        />
    </div>
    );
}

export default Trainigslist;

