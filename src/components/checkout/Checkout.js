import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { firestore } from '../../firebase/firebase';
import './checkout.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

var total = 0;
var addOrderinUserCounter = 0;
var addOrderCounter = 0;

export default function Checkout({basket,usermail} ) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [payments, setpayments] = React.useState({});
  const [address, setaddress] = React.useState({});

  const callbackFunction = (payments)=>{
    console.log(payments);
    setpayments(payments)
    // console.log("I am getting data")
  }

  const callbackFunctionAddress = (address)=>{
    console.log(address);
    setaddress(address)
    // console.log("I am getting data")
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm activeStep={activeStep} CheckoutCallbackAddress={callbackFunctionAddress} />;
      case 1:
        return <PaymentForm  activeStep={activeStep} CheckoutCallback={callbackFunction} />;
      case 2:
        return <Review basket={basket} payments={payments} address={address} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);

  };

  function addOrder(order){
    addOrderCounter++;
    if(addOrderCounter>1){
      return;
    }
    console.log('inside addOrder')
    firestore.collection("orders").add(order)
  }


  function addOrderInUser(order){
    addOrderinUserCounter++;
    if(addOrderinUserCounter>1){
      return;
    }

    console.log('inside addOrder In User')


    if(usermail===""){
        alert("Please Login First to Add Items in Cart")
        return;
    }

    firestore.collection('users').doc(usermail).get()
    .then( data => data.data() )
    .then( data => data.orders )
    .then( orders => { 
        var ord = [...orders,order] 
        
        firestore.collection('users').doc(usermail).set({
            inCart : [],
            orders : ord,
        },{merge: true})
    
    }  )
}

  if(basket.length>0){
    total = 0;
    basket.forEach( item => {
     total = total + (item.price * item.quantity)  
    }  )
}

  if(activeStep === steps.length){
    var order = {
      name : address.firstName + " " + address.lastName,
      items : basket,
      address : address.address1,
      contact : address.number,
      totalCost : total
    }
    addOrder(order);
    addOrderInUser(order);
  }

  return (
    <React.Fragment className="checkout">
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            AREA_51
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your Order has been placed!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}