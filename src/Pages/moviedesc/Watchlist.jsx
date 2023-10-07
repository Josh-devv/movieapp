import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import { useWatchlist } from "../../components/watchlist/WatchList";
import Navbar from "../../components/navbar/Navbar";
import BeatLoader from 'react-spinners/ClipLoader'
export default function Watchlist() {

  const { watchlist, addToWatchlist } = useWatchlist();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
        setTimeout(()=>{
          setLoading(false)
        }, 1000)
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
        <h5 className=" genre" id="gg2">My WatchList: {watchlist.length}</h5>
        <div className="head-app6">
          <div className="app6">

            {
              watchlist.length === 0 ?
                (
                  <div className="no-mov">
                    <h1>No Movies has been added...</h1>
                  </div>

                ) : (
                  watchlist.map((week) => (
                    <Link
                      to={{
                        pathname: `/movie/${week.id}`,
                        state: { movie: week },
                      }}
                      key={week.id}
                    >
                      <div className="carou-w6">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${week.poster_path}`}
                          alt=""
                        />
                      </div>

                      <div className="head-info0">
                        <span className="info00">{week.title}</span>
                        <div className="container-fluid ratings-w7">
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
                  ))
                )}
          </div>
        </div>
      </div>
        </>
      )}
      
    </>


  )
}