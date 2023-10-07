import React, { useRef } from "react";
import { useEffect, useState, useLayoutEffect } from "react";
import Popular from "../../components/popular/Popular";
import Footer from "../../components/footer/Footer";
import ClockLoader from "react-spinners/CircleLoader";
import Home from "../home/Home";
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
  const [tvShows, setTvShows] = useState([]);

 

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

  //this is for tv shows
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/tv?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())
      .then((json) => setTvShows(json.results));
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
        <h5 className="container-fluid genre pl-4 pt-4 pb-3">
          Upcoming movies
        </h5>
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
          itemClass="carousel"
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
                min: 1280,
              },
              items: 7,
              partialVisibilityGutter: 40,
            },
            desk: {
              breakpoint: {
                max: 1280,
                min: 1024,
              },
              items: 6,
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
            small: {
              breakpoint: {
                max: 768,
                min: 0
              },
              items: 3,
              partialVisibilityGutter: 30,
            }
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
              <div className="carou-we color-white">
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
          )}
        

        <h5 className="container-fluid genre pl-4 pt-4 pb-3">Popular Movies</h5>
        
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
          itemClass="carousel"
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
            desk: {
              breakpoint: {
                max: 1366,
                min: 1024,
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
            small: {
              breakpoint: {
                max: 768,
                min: 0
              },
              items: 3,
              partialVisibilityGutter: 30,
            }
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
          {popularMovies.map((mov) => (
            <Link to={{ pathname: `/movie/${mov.id}` }} key={mov.id}>
              <div className="carou-we color-white">
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
          )}
        

        <h5 className="container-fluid genre pl-4 pt-4 pb-3">Tv Shows</h5>

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
          itemClass="carousel"
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
            desk: {
              breakpoint: {
                max: 1366,
                min: 1000,
              },
              items: 7,
              partialVisibilityGutter: 30,
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
            small: {
              breakpoint: {
                max: 768,
                min: 0
              },
              items: 3,
              partialVisibilityGutter: 30,
            }
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
          {tvShows.map((mov) => (
            <Link to={{ pathname: `/movie/${mov.id}` }} key={mov.id}>
              <div className="carou-we color-white">
                <img
                  src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                  alt=""
                />
              </div>
              <div className="head-info">
                <span className="info pl-3">
                    {mov.name}
                </span>
                <div className="container-fluid ratings">
                  <small className="d-flex justify-content-center">
                    <IoMdStar size={20} color="yellow" />
                    {mov.vote_average}
                  </small>
                  <small className=" year">
                    {mov.first_air_date.split("-")[0]}
                  </small>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
          )}
        <h5 className="container-fluid genre pl-4 pt-4 pb-3">Top Rated Movies</h5>

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
          itemClass="carousel"
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
            desk: {
              breakpoint: {
                max: 1366,
                min: 1000,
              },
              items: 7,
              partialVisibilityGutter: 30,
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
            small: {
              breakpoint: {
                max: 768,
                min: 0
              },
              items: 3,
              partialVisibilityGutter: 30,
            }
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
          {ratedMovies.map((mov) => (
            <Link to={{ pathname: `/movie/${mov.id}` }} key={mov.id}>
              <div className="carou-we color-white">
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
          )}

        <Footer />

        <script src="../../components/slider/slider"></script>
      </body>
    </>
  );
}
