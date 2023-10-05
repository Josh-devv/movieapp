import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BiPlayCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useWatchlist } from "../../components/watchlist/WatchList";
import { IoMdStar } from "react-icons/io";
import { HiOutlinePlus } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

import "./movieselect.css";

export default function MovieSelect() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "543c959c84a2edaf19d168f7a042f6eb";
  const pages = 5;

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = [];
      for (let page = 1; page <= pages; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${page}`
        );
        const data = await response.json();
        movies.push(...data.results);
      }
      setPopularMovies(movies);
      setLoading(false);
    };

    fetchMovies();
  }, [pages]);

  console.log(popularMovies);

  return (

    <>
      <Navbar />
    
    <section className="all-mov">
      <div className="head-app3">
        {loading ? (
          <div className=" spins w-100">
            <FaSpinner spin className="spin" size={25} />
          </div>
        ) : (
          <div className="app3">
            {popularMovies.map((mov) => (
              <Link
                to={{ pathname: `/movie/${mov.id}`, state: { movie: mov } }}
                key={mov.id}
              >
                {loading ? (
                  <FaSpinner />
                ) : (
                  <>
                    <div className="carou-w color-white" key={mov.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                        alt=""
                      />
                    </div>

                    <div className="head-info">
                      <span className="info pl-3">{mov.title}</span>
                      <div className="ratings ">
                        <small className="d-flex justify-content-center align-items-center">
                          <IoMdStar size={20} color="yellow" />
                          {mov.vote_average}
                        </small>
                        <small className=" year">
                          {mov.release_date.split("-")[0]}
                        </small>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
