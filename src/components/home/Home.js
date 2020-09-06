import React from 'react'
import HomePic from '../../home-pic.svg'
import './home.css';
import { Link } from 'react-router-dom';

function Home() {

    function activeShop(){
        const home = document.querySelector(".home");
        const shop = document.querySelector(".shop");
        shop.classList.add('active')
        home.classList.remove('active')
    }

    return (
        <div className="container ">
            <div className="row home-container">
            <div className="home-pic col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12">
        
                <img src={HomePic}  alt="home pic" ></img>
               
            </div>            
            <div className="home-content col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12">
                 <span>AREA 51</span>
                 <p>Area 51, an E-Cell of IISER Kolkata Initiative is a completely student designed setup that aims to serve as a students-run store. As a store, Area 51 will cater to the sale of IISER Kolkata's official branded merchandise, and other student designed products ranging from Tees to Artworks. Area 51 also aims to one day, provide a platform for book exchange, bicycle resale, and other items resale within the student community. Being completely run and setup by students, Area 51 also gives the opportunity for IISER-Kites to polish their entrepreneurial skills and make them ready to face the world with an amazing skillset.</p>
                 <Link onClick={activeShop} className="start-shopping" style={{fontWeight:"bold"}} to="/merch">Start Shopping </Link>
            </div>
            </div>
        </div>
    )
}

export default Home
