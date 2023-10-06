import React, { useRef } from "react";
import { useEffect, useState, useLayoutEffect } from "react";
import Popular from "../../components/popular/Popular";
import Footer from "../../components/footer/Footer";
import Rated from "../../components/rated/Rated";
import UpComing from "../../components/upcoming/UpComing";
import ClockLoader from "react-spinners/CircleLoader";
import Home from "../home/Home";
import { setupMovieSliderScroll } from "../../components/slider/slider";

import "./movie.css";
export default function MovieSection() {

  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const movieSliderRef = useRef(null);
  const movieSliderRef2 = useRef(null);
  const movieSliderRef3 = useRef(null);

  //const [searchQuery, setSearchQuery] = useState('');//this state is the one that would be going thru the routes and taking along the value searched

  //for the slider component for movies
  useEffect(() => {
    setupMovieSliderScroll(movieSliderRef.current);
    setupMovieSliderScroll(movieSliderRef2.current);
    setupMovieSliderScroll(movieSliderRef3.current);
  }),
    [];

  //this is for upcoming movies
  useLayoutEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())

      .then((json) => {
        setUpComingMovies(json.results);
        setLoading(false);
      });
  }, []);

  //this is for popular movies
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())
      .then((json) => setPopularMovies(json.results));
  }, []);

  //this is for top rated movies
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())
      .then((json) => setRatedMovies(json.results));
  }, []);

  //loading style
  const override = {
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      <Home />
      <body className="body py-2">
        <div></div>
        <h5 className="container-fluid genre pl-4 pt-4 pb-1">
          Upcoming movies
        </h5>

        <div className="container-fluid head-app2" ref={movieSliderRef}>
          {loading ? (
            <div className=" spins w-100">
              <ClockLoader
                color="white"
                cssOverride={override}
                loading={loading}
                size={30}
              />
            </div>
          ) : (
            <div className="app2">
              <UpComing upComingMovies={upComingMovies} loading={loading} />
            </div>
          )}
        </div>

        <h5 className="container-fluid genre pl-4 pt-4">Popular Movies</h5>
        <div className="container-fluid head-app2" ref={movieSliderRef2}>
          {loading ? (
            <div className=" spins w-100">
              <ClockLoader
                color="white"
                cssOverride={override}
                loading={loading}
                size={30}
              />
            </div>
          ) : (
            <div className="app2">
              <Popular popularMovies={popularMovies} loading={loading} />
            </div>
          )}
        </div>

        <h5 className="container-fluid genre pl-4 pt-4">Top Rated Movies</h5>

        <div className="container-fluid head-app2" ref={movieSliderRef3}>
          {loading ? (
            <div className=" spins w-100">
              <ClockLoader
                color="white"
                cssOverride={override}
                loading={loading}
                size={30}
              />
            </div>
          ) : (
            <div className="app2">
              <Rated ratedMovies={ratedMovies} loading={loading} />
            </div>
          )}
        </div>

        <Footer />

        <script src="../../components/slider/slider"></script>
      </body>
    </>
  );
}
