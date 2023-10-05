import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ppp from '../../Assets/newmob-removebg-preview.png'
import { Link } from "react-router-dom";
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
                        <Link to={`/movies`}>
                            <button>Explore</button>
                        </Link>
                        
                    </div>
                    
                    <div className="pfp">
                        
                    </div>
               </div>
               
            </section>
        </>
    )
}