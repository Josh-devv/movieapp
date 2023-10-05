import React from "react";
import { IoMdStar } from "react-icons/io";

import { Link } from "react-router-dom";

import './upcoming.css'

export default function upComing({ upComingMovies, loading }){
    //console.log(loadinng);

    
   
    
    return (
       <>
                { 
                    upComingMovies.map((mov)=>(
                        <Link to={{pathname: `/movie/${mov.id}`}} key={mov.id}>  
                            
                            <div className="carou-w color-white">                                                    
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
        
