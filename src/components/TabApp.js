import React, {useState}  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import './App.css';
import  {BrowserRouter as Router,
        Route,
        } from 'react-router-dom';
//import Home from './Home';
import Customerlist from './Customerlist';
import Trainingslist from './Trainigslist';


function TabApp() {
    
    const [value, setValue] = useState('one');

    const handleChange= (event, value) => {
        setValue(value);
    };

    return(
        <div>
            <Router>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="one"label="Trainings list"/>
                    <Tab value="two"label="Customer list"/> 
                </ Tabs>
            </ AppBar>
            {value === 'one' && <div><Route exact path = "/"component = {Trainingslist}/></div>}
            {value === 'two' && <div><Route exact path = "/"component = {Customerlist}/></div>}
            
            </Router>
        </div>

    )
}
//<Route render={() => <h1> This is home page </h1>}/>
export default TabApp;