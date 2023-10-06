import React, { useRef } from "react";
import { useEffect, useState, useLayoutEffect } from "react";
import Popular from "../../components/popular/Popular";
import Footer from "../../components/footer/Footer";
import Rated from "../../components/rated/Rated";
import UpComing from "../../components/upcoming/UpComing";
import ClockLoader from "react-spinners/CircleLoader";
import Home from "../home/Home";
import { setupMovieSliderScroll } from "../../components/slider/slider";

import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./movie.css";
export default function MovieSection() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);

  const movieSliderRef = useRef(null);
  const movieSliderRef2 = useRef(null);
  const movieSliderRef3 = useRef(null);

  const [slides, setSlides] = useState(1);

  //const [searchQuery, setSearchQuery] = useState('');//this state is the one that would be going thru the routes and taking along the value searched

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
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={2000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1366,
              },
              items: 7,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 1024,
                min: 768,
              },
              items: 5,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 900,
                min: 768,
              },
              items: 4,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {upComingMovies.map((mov) => (
            <Link to={{ pathname: `/movie/${mov.id}` }} key={mov.id}>
              <div className="carou-w color-white">
                <img
                  src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                  alt=""
                />
              </div>
              <div className="head-info">
                <span className="info pl-3">{mov.title}</span>
                <div className="container-fluid ratings">
                  <small className="d-flex justify-content-center">
                    <IoMdStar size={20} color="yellow" />
                    {mov.vote_average}
                  </small>
                  <small className=" year">
                    {mov.release_date.split("-")[0]}
                  </small>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        

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
