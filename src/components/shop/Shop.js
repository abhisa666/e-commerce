import React from 'react'
import './shop.css';
import { Link } from 'react-router-dom';
import {Grid} from '@material-ui/core';


function Shop() {
    return (
        <div className="container ">
            <div className="row shop-container">
                <div className="merch col-lg-4 col-xl-4 col-md-12 col-sm-12 col-12">
                    {/* <div className="details">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    </div> */}
                    <Link to="/merch">Merch</Link>
                </div>
                <div className="books col-lg-4 col-xl-4 col-md-12 col-sm-12 col-12">
                    {/* <div className="details">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    </div> */}
                    <Link to="/books">Books</Link>
                </div>
                <div className="ebay col-lg-4 col-xl-4 col-md-12 col-sm-12 col-12">
                    {/* <div className="details">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    </div> */}
                    <Link to="/ebay">Ebay</Link>
                </div>
            </div>

        </div>
    )
}

export default Shop
