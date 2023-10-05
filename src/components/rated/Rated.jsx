import React from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";

import './rated.css'

export default function Rated({ ratedMovies }) {
    
  return (
    <>
        { 
            ratedMovies.map((mov)=>(

                <Link to={{pathname: `/movie/${mov.id}`, state:{movie: mov}}} key={mov.id}>    
                    <div className="carou-w color-white" key={mov.id}>                                                    
                        <img src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`} alt="" />
                    </div> 
                    <div className="head-info">
                        <span className="info pl-3">{mov.title}</span>
                        <div className='container-fluid ratings d-flex'>
                            <small className="d-flex justify-content-center align-items-center"><IoMdStar size={20} color="yellow" />{mov.vote_average}</small>
                            <small className=' year'>{mov.release_date.split("-")[0]}</small>
                        </div>
                    </div>
                </Link>
        ))}
    </>
)}
