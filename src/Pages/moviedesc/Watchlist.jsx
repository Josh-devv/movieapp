import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import { useWatchlist } from "../../components/watchlist/WatchList";
import Navbar from "../../components/navbar/Navbar";
import BeatLoader from 'react-spinners/ClipLoader'
import CaroItems from "../../components/carousel/CaroItems";

export default function Watchlist() {

  const { watchlist, addToWatchlist } = useWatchlist();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
        setTimeout(()=>{
          setLoading(false)
        }, 500)
  },[])

  const override = {
    margin: "0 auto",
    borderColor: "white",
  };

  return (
    <>
     {
      loading ? (
        <div className=" spin ">
        <BeatLoader color="white" cssOverride={override} loading={loading} size={50} />
        </div>
      ) : (
        <>
        <Navbar />
      <div className="gen6 pt-5">
        
        <div className="head-wat">
         <h5 className=" genre" id="gg3">My WatchList: {watchlist.length}</h5>

            {
              watchlist.length === 0 ?
                (
                  <div className="no-mov">
                    <span>No Movies has been added...</span>
                  </div>

                ) : (
                  <div className="app3">
                
                  
                    {watchlist.map((mov) => (
                      <CaroItems
                        title={mov.title}
                        id={mov.id}
                        poster_path={mov.poster_path}
                        vote_average={mov.vote_average}
                        release_date={mov.release_date}
                      />
                    ))}
                  
                  
                </div>
                )
                 }
          
        </div>
      </div>
        </>
      )}
      
    </>


  )
}