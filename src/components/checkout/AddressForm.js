import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



export default function AddressForm({activeStep,CheckoutCallbackAddress}) {

 
  const[firstname,setFirstName] = useState('');
  const[lastname,setLastName] = useState('');
  const[address1,setaddress1] = useState('');
  const[city,setCity] = useState('');
  const[state,setState] = useState('');
  const[number,setNumber] = useState('');

  function handleChange(e){
    if(e.target.id==='firstName'){
      setFirstName(e.target.value);
    }else if( e.target.id === 'lastName'){
      setLastName(e.target.value);
    }
    else if( e.target.id === 'address1'){
      setaddress1(e.target.value);
    }
    else if( e.target.id === 'city' ){
      setCity(e.target.value);
    }
    else if( e.target.id === 'state' ){
      setState(e.target.value);
    }
    else if( e.target.id === 'number' ){
      setNumber(e.target.value);
    }
  }

  var address={
    firstName : firstname,
    lastName : lastname,
    address1 : address1,
    city : city,
    state : state,
    number : number
  }

  const sendDatafromAddress = () => {
    CheckoutCallbackAddress(address);
    btn.removeEventListener('click',sendDatafromAddress);
}


// console.log("Active step in Address " + activeStep)
const btn = document.querySelector(".MuiButton-root");



if(activeStep === 0){
  if(btn){
    btn.addEventListener('click',sendDatafromAddress);
  }  
}else{
  btn.removeEventListener('click',sendDatafromAddress);
}

//  console.log(btn);\


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={ (e) => handleChange(e) }
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={ (e) => handleChange(e) }
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={ (e) => handleChange(e) }
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={ (e) => handleChange(e) }
            id="number"
            name="number"
            label="Number"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={ (e) => handleChange(e) }
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={ (e) => handleChange(e) }  id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={ (e) => handleChange(e) }
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}