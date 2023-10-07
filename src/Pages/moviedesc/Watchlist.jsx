import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { useWatchlist } from "../../components/watchlist/WatchList";
import Navbar from "../../components/navbar/Navbar";
export default function Watchlist(){
    const { watchlist, addToWatchlist } = useWatchlist();
    const [clicked, setClicked] = useState(false);

    const handleAddToWatchlist =()=>{
        setClicked(true)
    }

    return(
        <>
        <Navbar/>

         <div className="gen5 pt-5">
          <h5 className="genre" id="ggg">My WatchList</h5>
          <div className="head-app5">
            <div className="app5">
              

              {watchlist.map((week) => (
                <Link
                  to={{
                    pathname: `/movie/${week.id}`,
                    state: { movie: week },
                  }}
                  key={week.id}
                >
                  <div className="carou-w5">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${week.poster_path}`}
                      alt=""
                    />
                  </div>

                  <div className="head-info0">
                    <span className="info0">{week.title}</span>
                    <div className="container-fluid ratings-w5">
                      <small className="">
                        <IoMdStar size={20} color="yellow" />
                        {week.vote_average}
                      </small>
                      {week.release_date && week.release_date.split("-")[0] ? (
                        <small>{week.release_date.split("-")[0]}</small>
                      ) : (
                        <small className="d-none">
                          Release date not available
                        </small>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        </>
       

    )
}