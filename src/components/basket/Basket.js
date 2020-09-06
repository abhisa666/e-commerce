import React,{useEffect,useState} from 'react'
import './basket.css';
import {firestore} from '../../firebase/firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {Link} from 'react-router-dom';


function Basket( {usermail,basket,fetchBasket}) {

// const [basket,setbasket] = useState([]);
const [total,settotal] = useState(0);
const [quantity,setquantity] = useState(0);

  // function fetchBasket(){
  //   return firestore.collection('users').doc(usermail).get()
  //   .then(  doc => {
  //       var data = doc.data();
  //       var inCart = data.inCart;
  //       console.log(data);
  //       setbasket(inCart);
  //       } )
  // }

  function computeTotal(){
    settotal(0);
    console.log("inside compute total")
    console.log(basket)

    if(basket.length>0){
        basket.forEach( item => {
        console.log(item.price)
        settotal( total => total + (item.price * item.quantity)  )
        }  )
    }
  }

  function computeQuantity(){
    setquantity(0);
    console.log("inside compute total")
    console.log(basket)

    if(basket.length>0){
        basket.forEach( item => {
        setquantity( quantity => quantity + item.quantity  )
        }  )
    }
  }

  function deleteFromCart(id){
    console.log("delete from cart run");

    var bas = basket.filter( obj => obj.id !== id )
    // basket.splice(id,1);
    // console.log(basket);
    firestore.collection('users').doc(usermail).set({
      inCart : bas
    },{merge:true}).then( () => fetchBasket() )
  }

  function addQuantity(id){
    var objIndex = basket.findIndex((obj => obj.id === id));
    basket[objIndex].quantity += 1;
    firestore.collection('users').doc(usermail).set({
      inCart : basket
    },{merge:true}).then( () => fetchBasket() )
  }

  function subQuantity(id){
    var objIndex = basket.findIndex((obj => obj.id == id));
    basket[objIndex].quantity -= 1;
    firestore.collection('users').doc(usermail).set({
      inCart : basket
    },{merge:true}).then( () => fetchBasket() )
  }

  useEffect( () => {
    if(usermail!==""){
        fetchBasket();
    }   
    
  },[usermail]  )

  useEffect( () => {
    if(basket){
      computeTotal();
      computeQuantity();
    }
  },[basket] )
    
  // if(usermail!==""){
  //   fetchBasket();
  // }
  var cartQuantity = document.querySelector(".cart-quantity");
  console.log(cartQuantity)
  // cartQuantity.style.display = 'none';


    return (
  
        <div className="container outer" >
          {
            basket.length===0 ? <> <div> Your Cart is Empty  </div>
                                <Link to="/merch" >Start Shopping</Link>

               </> :
          
          <div className="row left-right-row">
              <div className="col-12 col-lg-8 basket-left">
                <div className="container items-container">
                  <div className="row item-row">
                    { 
                    basket.map( item => (
                      <div className="col-12 item-conatiner">
                          <img src={item.image} alt="img"></img>
                          <div className="item-detail">
                            <div> {item.name} </div>
                            <div> {item.price} </div>
                          </div>
                          <div className="quantity"> {item.quantity} </div>
                          <div className="btn-section">
                              {
                                item.quantity===1 ? <> <AddCircleIcon className="add-quantity" onClick={ () => addQuantity(item.id) } /> <DeleteIcon className="delete-from-cart" onClick={ () => deleteFromCart(item.id) } /> </> : <> <AddCircleIcon className="add-quantity"  onClick={ () => addQuantity(item.id) } /> <RemoveCircleOutlineIcon className="sub-quantity" onClick={ () => {subQuantity(item.id)} } /> </>
                              }
                          </div>
                      </div>

                    ))
                    }
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 basket-right">
                <span style={{fontWeight:"bold"}} >Total Items</span>
                <span> {quantity} </span>
                <span style={{fontWeight:"bold"}}  > Total </span>
                <span> { "Rs " +  total} </span>
                <Link to="/checkout"> Proceed to CheckOut </Link>
              </div>
          </div>
}
        </div>
    )
}


export default Basket;
