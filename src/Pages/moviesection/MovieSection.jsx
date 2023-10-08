import React, { useRef }from "react";
import { useEffect, useState, useLayoutEffect } from "react";
import Footer from "../../components/footer/Footer";
import ClockLoader from "react-spinners/CircleLoader";
import Home from "../home/Home";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import UpComing from '../../components/upcoming/UpComing'
import Carousel from "react-multi-carousel";
import BeatLoader from 'react-spinners/ClipLoader'
import "react-multi-carousel/lib/styles.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Caros from "../../components/carousel/Carousel";
import CaroItems from "../../components/carousel/CaroItems";
import "./movie.css";

export default function MovieSection() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [genre, setGenre] = useState([]);


  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    }, 1500)
  }, [])

  //const [searchQuery, setSearchQuery] = useState('');//this state is the one that would be going thru the routes and taking along the value searched

  //this is for upcoming movies
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())

      .then((json) => {
        setUpComingMovies(json.results);
       
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


  //for genre of movies
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())
      .then((json) => {
        // Find the genre ID for "Romance"
        const gen= json.genres.find((genre) => genre.name === "Romance");
  
        if (gen) {
          // Now you can use the genre ID to fetch romance movies
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=543c959c84a2edaf19d168f7a042f6eb&with_genres=${gen.id}`
          )
            .then((response) => response.json())
            .then((json) => setGenre(json.results))
            .catch((error) => console.error("Error fetching romance movies:", error));
        }
      })
      .catch((error) => console.error("Error fetching genre list:", error));
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
  const newride ={
    color: "white",
    height: "50vh"
  }

  return (
    <>
      {loading ? (
        <div className=" spin ">
          <BeatLoader
            color="white"
            cssOverride={override}
            loading={loading}
            size={50}
          />
        </div>
      ) : (
        <>
          <Home />

          <body className="body py-2">
            <div></div>

            <div className="caro-head-style">
              <h5 className="container-fluid genre pl-4 pt-4 pb-3">
                Upcoming movies
              </h5>
              <Caros>
                {upComingMovies.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>
            </div>

            <div className="caro-head-style">
              <h5 className="container-fluid genre pl-4 pt-4 pb-3">
                Popular Movies
              </h5>

              <Caros>
                {popularMovies.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>
            </div>

            <div className="caro-head-style">
              <h5 className="container-fluid genre pl-4 pt-4 pb-3">
                Latest Movies
              </h5>

              <Caros>
                {ratedMovies.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>
            </div>

            <div className="caro-head-style">
              <h5 className="container-fluid genre pl-4 pt-4 pb-3">
                Thriller movies
              </h5>

              <Caros>
                {genre.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>
            </div>

            <div>
              <h5 className="container-fluid genre pl-4 pt-4 pb-3">
                Top Rated Movies
              </h5>
              <Caros>
                {ratedMovies.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>
              
            </div>

            <Footer />

            <script src="../../components/slider/slider"></script>
          </body>
        </>
      )}
    </>
  );
}
