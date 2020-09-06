import React, {useState,useEffect} from 'react';
import {Route,Switch,BrowserRouter,Redirect} from 'react-router-dom'
import {firestore,auth} from './firebase/firebase';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Shop from './components/shop/Shop';
import Merch from './components/merch/Merch';
import Login from './components/login/Login';
import Basket from './components/basket/Basket';
import Checkout from './components/checkout/Checkout';


function App() {


const [basket,setbasket] = useState([]);
const [user,setUser] = useState(null);
const [cartQuantity,setcartQuantity] = useState(0);

  function computeQuantity(){
    setcartQuantity(0);
    console.log("inside compute total")
    console.log(basket)

    if(basket.length>0){
        basket.forEach( item => {
          setcartQuantity( quantity => quantity + item.quantity  )
        }  )
    }
  }


function fetchBasket(){
  console.log("fetchBasket")
  return firestore.collection('users').doc(user.email).get()
  .then(  doc => {
      var data = doc.data();
      var inCart = data.inCart;
      console.log(data);
      setbasket(inCart);
      } )
}

  // function addItems(){
  //   items.forEach( (item) => {
  //     firestore.collection('merch').add(item)
  //   } )
  // }


  function authListner(){

    auth.onAuthStateChanged( (user) =>{
        if(user){
          setUser(user);
        }else{
          setUser(null);
        }
    } );
  }

  useEffect( ()=> {
    authListner();
    
    if(user){
      console.log("we have a user");
      console.log(user.email);
      fetchBasket();
    }
    // addItems();
  },[user])


  



  return (
    <div className="App">
      <BrowserRouter>
        <Header user={user} basket={basket} />
        <Switch>
          <Route exact path="/" component={Home} / >
          {/* <Route path="/shop" component={Shop} /> */}
          <Route path="/merch">
              <Merch usermail={ user?user.email: "" } basket={basket}  fetchBasket={fetchBasket} />
          </Route>  
          <Route path="/login" component={Login} />
          <Route path="/basket">
              <Basket usermail={user?user.email:"" } basket={basket} fetchBasket={fetchBasket} />
          </Route>
          <Route path="/checkout">
              <Checkout basket={basket} usermail={user?user.email:"" }  />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
