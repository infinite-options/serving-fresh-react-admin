import React, { Component, useContext, useState, useEffect } from 'react'
import Item from "./Item";
import AddItemModel from './AddItemModel'
import NumberFormat from 'react-number-format';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import {AdminFarmContext} from '../AdminFarmContext'
import axios from 'axios';
import {Grid, Paper, Button, Typography, Card, CardActions, CardMedia, CardContent, Modal, TextField, CircularProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/itemsByBusiness/200-000003
//api/v2/businesses
//https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/businesses
const API_BASE_URL = 'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/itemsByBusiness/';

export default function FarmerHome({ farmID, farmName, ...props }) {
    // const {farmID, setFarmID} = useContext(AdminFarmContext);
    // NOTE: 
    // Empty object inside array caused the first item component to render with no data. 
    // This meant upon a page load/refresh, the heart icon would always be greyed out regardless of the data.favorite value.
    // Why does the farmData array initialize with an empty object? Was this required for something? 
    // If this empty object was required, an alternative fix would be to add a useEffect with data prop dependency to Item.js.
    const [farmData, setFarmData] = useState([]); 
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState("");
    const [mealName, setMealName] = useState('');
    const [item, setItem] = useState({name:'', quantity:'', price:'',});
    const classes = useStyles();

    // let farmName;
    // if(farmID === '200-000003') {farmName = 'Esquivel Farm'}
    // if(farmID === '200-000004') {farmName = 'Resendiz Family'}
    
    useEffect(() => {
        //get data from farm
        console.log("get farm data..");
        getBusinessItems(API_BASE_URL + farmID, setFarmData);
    }, [farmID]);

    const getBusinessItems = (urlAPI, setData) => {
        axios.get(urlAPI)
        .then(response => {
            console.log('reload')
            
            console.log("Home:", response.data.result.result)
            setData(response.data.result.result)
        })
        .catch(err => {
            console.log(err);
        });
    };

    const handleOpenModel = () => {
        // console.log(farmData)
        setOpen(true);
    };
    const handleCloseModel = () => {
        setOpen(false);
    };
    
    
    //model for when farmer adds new item
    const modelBody = (
        // adding parent <div> fixes 'Material-UI: The modal content node does not accept focus' warning.
        <div><AddItemModel farmID={farmID} handleClose={handleCloseModel} setData={setFarmData}/></div>
    );

    return (
        <div hidden={props.hidden}>
            <div style={labelStyle}>
                <h1>{farmName}</h1>
            </div>
            <div style={labelStyle}>
                <h2>Current Produce</h2>
            </div>
            <div style={labelStyle}>
                <Button onClick={handleOpenModel}>Add Product</Button>    
            </div>
            {/* {!farmData.length ? ( */}
                <Grid container spacing={2}/* style={{ width: "100%", margin: 0 }}*/>
                    {
                        //map through each item and display it
                        farmData.map((itemData, idx) => {
                            if(!itemData.item_status || 
                                itemData.item_status.toLowerCase() !== "hidden" && 
                                itemData.item_status.toLowerCase() !== "past")
                             return <Item data={itemData} key={idx} index={idx} setData={setFarmData}/>
                        })
                    }
                    
                </Grid>
            {/* ) : (<CircularProgress/>)} */}
            <Modal open={open} onClose={handleCloseModel}>
                {modelBody}
            </Modal>
            {/* {!farmData.length ? ( */}
                <Grid container spacing={2}>
                   
                </Grid>
            {/* ) : (<CircularProgress/>)} */}
            
            <div style={labelStyle}>
                <h2>Past Produce</h2>
            </div>
            
            {/* {!farmData.length ? ( */}
                <Grid container spacing={2}>
                    {
                        //map through each item and display it
                        farmData.map((itemData, idx) => {
                            if(itemData.item_status && 
                               itemData.item_status.toLowerCase() === "past")
                             return <Item data={itemData} key={idx} index={idx} setData={setFarmData}/>
                        })
                    }
                    
                </Grid>
            {/* ) : (<CircularProgress/>)} */}
        </div>
    )
}

//styling
const paperStyle = {
    height: '2000px',
    width: '95%',
    maxWidth: '2000px',
    textAlign: 'center',
    display: 'inline-block',
    padding: '7px',
    marginTop: '30px',
    backgroundColor: 'white',
};
const labelStyle = {
    backgroundColor: 'white',
    width: '80%',
    textAlign: 'left',
    marginLeft: '25px',
    marginBottom: '20px',
}
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '75%',
      maxWidth: '500px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      borderRadius: '20px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`,
      outline: 'none',
    },
    card: {
        maxHeight: '600px',
    },
    formControl: {
        margin: theme.spacing(1),
        width: 150,
        minWidth: 75,
    },
      selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function NumberFormatCustomPrice(props) {
    const { inputRef, onChange, ...other } = props;
   
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }

  