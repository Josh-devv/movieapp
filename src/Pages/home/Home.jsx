import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";

import './home.css'


export default function Home(){
    return(
        <>

        <Navbar />
            <section className="home-banner">
               <div className=" home-page">
                    <div className="home-head">
                        <h1 className="">Discover free Movies</h1>
                        <p className="">Thousands of Movies & TV shows available just for you on JoshFlix!</p>
                        <Link to={`/movies`}>
                            <button className="but">Explore</button>
                        </Link>
                        
                    </div>
                    
                    <div className="darkbg"></div>
               </div>
               
            </section>
        </>
    )
}