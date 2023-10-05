import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ppp from '../../Assets/mobile-0819.jpg'

import './home.css'


export default function Home(){
    return(
        <>
            <section className="home-banner">
                 <Navbar />
               <div className=" home-page">
                    <div className="pfpf">
                        <h1 className="">Discover free Movies</h1>
                        <p className="">Thousands of movie & TV shows available just for you!</p>
                        <button>Explore</button>
                    </div>
                    
                    <div className="pfp">
                        <img src={ppp} className="" />
                    </div>
               </div>
               
            </section>
        </>
    )
}