import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];
// const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const labels = [ 'Card type' , 'Card holder', 'Card number', 'Expiry date' ];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

var total = 0;

export default function Review( {address, payments, basket} ) {
  const classes = useStyles();

  if(basket.length>0){
    total = 0;
    basket.forEach( item => {
     total = total + (item.price * item.quantity)  
    }  )
}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {basket.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary= { "x"  + product.quantity } />
            <Typography variant="body2">{product.price * product.quantity}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            { total }
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.firstName + " " + address.lastName} </Typography>
          <Typography gutterBottom>{address.address1}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
          
              <React.Fragment key={payments.cardName}>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card holder</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payments.cardName}</Typography>
                </Grid>
              </React.Fragment>

              <React.Fragment key={payments.cardName}>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payments.cardNumber}</Typography>
                </Grid>
              </React.Fragment>

              <React.Fragment key={payments.cardName}>
                <Grid item xs={6}>
                  <Typography gutterBottom>Expiry Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payments.expDate}</Typography>
                </Grid>
              </React.Fragment>
          
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}