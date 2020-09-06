import React from 'react'
import {Link,withRouter} from 'react-router-dom';
import './header.css';
import Logo from '../../logo.jpeg';
import {firestore,auth} from '../../firebase/firebase';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


function Header({user,history,basket}) {

    if(basket.length){
        var count = 0;
        basket.forEach( item => {
            count = count + item.quantity;
        } )
    }

    function openNav(){
        const nav = document.querySelector(".nav");
        console.log(nav);
        nav.classList.toggle("nav-active")

    }
        
    

    function activeShop(){
        const home = document.querySelector(".home");
        const shop = document.querySelector(".shop");
        shop.classList.add('active')
        home.classList.remove('active')
    }
    function activeHome(){
        const home = document.querySelector(".home");
        const shop = document.querySelector(".shop");
        shop.classList.remove('active')
        home.classList.add('active')
    }


    function logout(){
        console.log("inside logout");
        auth.signOut()
        .then( ()=> openNav() )
        .then( () => { history.push('/') } )
        ;
      }

    return (
        <div className="header ">
            <Link to="/" className="logo">  
                <img src={Logo} alt="Area 51 Logo" ></img>
                {/* AREA 51 */}
            </Link>
            <ul className="nav">
                <Link className="home active" onClick={ () => { openNav(); activeHome (); } } to="/">Home</Link>
                <Link  className="shop" onClick={ () => { openNav(); activeShop (); } } to="/merch">Shop</Link>
                <Link onClick={openNav} to="/">About Us</Link>
                <Link onClick={openNav} to="/">Contact Us</Link>
                {
                !user ? 
                <Link onClick={openNav} to="/login" className="login">
                    <span>Login</span> 
                </Link>
                :
                <>
                <div>
                    <span> {user.email} </span> 
                </div>
                <Link to="/basket">
                    <ShoppingBasketIcon />
                    <span className="cart-quantity"> { user? count : ""}</span>
                </Link>
                <div onClick={logout} className="login">
                    <span>Logout</span> 
                </div>
                </>    

            }
            </ul>

            

            <div className="burger" onClick={openNav}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
            
        </div>
    )
}

export default withRouter(Header);
