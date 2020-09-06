import React,{useEffect,useState} from 'react'
import './itemcard.css'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { firestore } from '../../firebase/firebase';

var count =0;

function Itemcard({item,usermail,parentCallback,fetchBasket}) {

   

    const sendData = () => {
        parentCallback(count);
   }

//    useEffect( () => {
//     sendData();
//     console.log(" Item card is rendering")
//    }, [cartCount] )
  

    function addToCart(usermail,id,name,price,image,e){
        console.log("inside add to cart");

        // var bas =[]

        if(usermail===""){
            alert("Please Login First to Add Items in Cart")
            return;
        }

    

        var addBtn = e.target;
        addBtn.innerHTML = "In Cart";
        addBtn.classList.toggle("in-cart");


        firestore.collection('users').doc(usermail).get()
        .then( data => data.data() )
        .then( data => data.inCart )
        .then( inCart => { 
            var bas = [...inCart,{
                id: id,
                name: name,
                price: price,
                image: image,
                quantity : 1
            }] 
            // console.log(inCart.length);
            count = inCart.length+1;
            sendData();

            
            firestore.collection('users').doc(usermail).set({
                inCart : bas,
            },{merge: true})
            .then( ()=>{ fetchBasket() } )
            


        }  )
        

    }



    return (
        <div className="card">
            <div className="item-img"><img src={item.image} alt="img" ></img> </div>
            <div className="item-content">
                <span className="item-name" style={{fontWeight:"bold"}}> {item.name} </span>
                {/* <span className="item-des"> {item.size} {item.color} {item.price}  </span> */}
            </div>
            <div className="item-btn-section">
                <span style={{fontWeight:"bold"}} > { "Rs " + item.price}  </span>
                {/* <ShoppingCartIcon className="add-btn" onClick={ () => { addToCart(usermail,item.name,item.price,item.image) }  }  /> */}
                <button style={{fontWeight:"bold"}} name={item.name} className="add-btn" onClick={ (e) => { addToCart(usermail,item.id,item.name,item.price,item.image,e) }  } > Add to Cart </button>
                {/* <FavoriteBorderIcon /> */}
            </div>
            
        </div>
    )
}

export default Itemcard;
