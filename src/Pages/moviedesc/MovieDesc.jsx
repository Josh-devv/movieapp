import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BiPlayCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useWatchlist } from "../../components/watchlist/WatchList";
import { IoMdStar } from "react-icons/io";
import { HiOutlinePlus } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

import "./movie.css";

export default function MovieDesc() {
  const loc = useLocation(); //to bring the location of the page
  const { id } = useParams(); //taking the id from the routes using useParams which passed thru the routes
  const [mdetails, setMdetails] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef(null);
  const { watchlist, addToWatchlist } = useWatchlist();
  const [clicked, setClicked] = useState(false);

  const handleAddToWatchlist = () => {
    addToWatchlist(mdetails);
    setClicked(true);
  };

  //for all movies for the unique id to be found
  useEffect(() => {
    const imageSize = "w1280";

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=543c959c84a2edaf19d168f7a042f6eb`
    )
      .then((response) => response.json())
      .then((data) => {
        setMdetails(data);
      })

      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);
  console.log(mdetails);

  //useEffect Code for lazy loading
  useEffect(() => {
    if (imgRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.unobserve(imgRef.current);
          }
        });
      });

      observer.observe(imgRef.current);

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, []);

  //for all weekly rated movies
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=543c959c84a2edaf19d168f7a042f6eb`
    )
      .then((response) => response.json())
      .then((json) => setWeekly(json.results))
      .catch((error) => console.error("Error fetching movie details:", error));

    window.scrollTo(0, 0); //for it to go back to the top of the page onClick of any Link
  }, [loc]); //by passing in the useLocation hook

  return (
    <>
      <Navbar />
      <section className=" desc-body">
        <div className="head-desc">
          <div className="desc-img">
            {mdetails.backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original${mdetails.backdrop_path}`}
                width={100}
                className="iii"
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/original${mdetails.poster_path}`}
                width={100}
                className="iii"
              />
            )}
          </div>
          <div className="dark"></div>
        </div>

        <div className="container-fluid desc-info">
          <div className="descc">
            <div className="desc-carou color-white">
              <img
                src={`https://image.tmdb.org/t/p/w500${mdetails.poster_path}`}
                alt=""
              />
            </div>

            <h1 className="desc-name">{mdetails.title}</h1>
            <span>
              <small className="rating">
                <IoMdStar size={20} color="yellow" />
                {typeof mdetails.vote_average === "number"
                  ? mdetails.vote_average.toFixed(1)
                  : "N/A"}
              </small>
              |
              {mdetails.release_date && mdetails.release_date.split("-")[0] ? (
                <small className="year ml-2 mr-2">
                  {mdetails.release_date.split("-")[0]}
                </small>
              ) : (
                <small className="">Release date not available</small>
              )}
              |<small className="mins ml-2">{mdetails.runtime}mins</small>
            </span>

            <span className="overview">{mdetails.overview}</span>
            <span className="tagline mt-3">
              <i>"{mdetails.tagline}"</i>
            </span>

            <div className="btns d-flex">
              <button className="desc-button"> Watch Now</button>
              <button className="desc-button1" onClick={handleAddToWatchlist}>
                <HiOutlinePlus />
                <span>Add to WatchList</span>
              </button>
            </div>
          </div>
        </div>
        <div className="gen" style={{ display: clicked ? "block" : "none" }}>
          <h5 className="genre">My WatchList</h5>
          <div className="head-app2">
            <div className="app2">
              <div>
                <div
                  className="carou-add color-white"
                  onClick={handleAddToWatchlist}
                ></div>
                <div className="">
                  <span className="click">Click this to add</span>
                </div>
              </div>

              {watchlist.map((week) => (
                <Link
                  to={{
                    pathname: `/movie/${week.id}`,
                    state: { movie: week },
                  }}
                  key={week.id}
                >
                  <div className="carou-add">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${week.poster_path}`}
                      alt=""
                    />
                  </div>

                  <div className="head-info">
                    <span className="info in pl-3">{week.title}</span>
                    <div className="container-fluid ratings">
                      <small className="d-flex justify-content-center align-items-center">
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

        <div>
          <h5 className="container-fluid genre pt-5">Weekly Rated Movies</h5>
          <div className="head-app2">
            <div className="app2">
              {weekly.map((week) => (
                <Link
                  to={{
                    pathname: `/movie/${week.id}`,
                    state: { movie: week },
                  }}
                  key={week.id}
                >
                  <div className="carou-w color-white">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${week.poster_path}`}
                      alt=""
                    />
                  </div>

                  <div className="head-info">
                    <span className="info">{week.title}</span>
                    <div className="cont ratings d-flex">
                      <small className="star">
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

        <Footer />
      </section>
    </>
  );
}
