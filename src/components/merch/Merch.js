import React,{useState,useEffect} from 'react'
import {Grid} from '@material-ui/core';
import './merch.css';
import Itemcard from '../itemcard/Itemcard';
import {firestore} from '../../firebase/firebase';

// var cartCount=0;

function Merch({usermail,basket,fetchBasket}) {

  const [merch,setMerch] = useState([]);

  var countJson = localStorage.getItem('count');
  var countObj = JSON.parse(countJson);
  // console.log(countObj.cartCount );

  const [count,setCount] = useState(countObj.cartCount);
  
  

  function fetchMerch(){
    console.log("in fetch merch")
    var mer = [];
    firestore.collection("merch").get()
    .then( snapshot => {
        snapshot.forEach( (doc) => {
            mer.push(doc.data());
        }  )
        return mer;
    } )
    .then( data => setMerch(data) )
  }

  function makeInCart(){
    console.log(" make in cart")
    var bas = basket.map( item => item.id );
    console.log(bas);
    merch.forEach( (item) => {
      if(  bas.includes(item.id) ){
          var addBtn = document.querySelector(`button[name='${item.name}']`);
          console.log(addBtn);
          addBtn.innerHTML = "In Cart";
          addBtn.classList.add('in-cart');
      }
    } )
  }

  useEffect( () => {
    fetchMerch();
    
  }, []  )

  // useEffect( () => {
    
  // }, [usermail]  )

  useEffect( () => {
    // if(usermail){
    //   fetchBasket();
    // }
      makeInCart();
  }, [merch,basket]  )

  const callbackFunction = (childData)=>{
    console.log(childData);
    setCount(childData);
    localStorage.setItem('count', JSON.stringify({'cartCount':childData}));
  }


    return (
        <div className="merch-container">
            <div className="left">
                <ul className="items-list">
                    <li>T-Shirts</li>
                    <li>Hoodies</li>
                    <li>Mugs</li>
                    <li>Caps</li>
                </ul>
            </div>
            <div className="right">
                <div className="filters"></div>
                <div className="items-container container" >
                    <div className="row">
                    {
                        merch.map( (item) => (
                            
                            <div className="col-lg-3 col-xl-3 col-md-4 col-sm-6 col-12">
                                <Itemcard item={item} usermail={usermail} parentCallback={callbackFunction} fetchBasket={fetchBasket} />
                            </div>
                       
                    ) ) 
                    }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Merch
