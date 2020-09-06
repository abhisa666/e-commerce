import React,{useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function PaymentForm({activeStep,CheckoutCallback}) {


  const [cardName,setCardName] = useState('');
  const [cardNumber,setCardNumber] = useState('');
  const [expDate,setExpDate] =useState('');
  const [cvv,setCvv] =useState('');

  function handleChange(e){
    if(e.target.id==='cardName'){
      setCardName(e.target.value);
    }else if( e.target.id === 'cardNumber'){
      setCardNumber(e.target.value);
    }
    else if( e.target.id === 'expDate'){
      setExpDate(e.target.value);
    }
    else if( e.target.id === 'cvv' ){
      setCvv(e.target.value);
    }
  }

  var payments={
    cardName : cardName,
    cardNumber : cardNumber,
    expDate : expDate,
    cvv : cvv
  }


  

  const sendDatafromPayment = () => {
      CheckoutCallback(payments);
      btn.removeEventListener('click',sendDatafromPayment);
}

    // console.log("Active step in Payment " + activeStep)
    const btn = document.querySelector(".MuiButton-contained");

    

    if(activeStep === 1){
      btn.addEventListener('click',sendDatafromPayment);
    }else{
      btn.removeEventListener('click',sendDatafromPayment);
    }

 

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField  onChange={ (e) => handleChange(e) } required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onChange={ (e) => handleChange(e) }
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField onChange={ (e) => handleChange(e) } required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onChange={ (e) => handleChange(e) }
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}