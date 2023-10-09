import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import BeatLoader from 'react-spinners/BeatLoader'

import Caros from "../../components/carousel/Carousel";
import CaroItems from "../../components/carousel/CaroItems";
import "./genre.css"



import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../../components/footer/Footer";


export default function MovieSelect() {
  const [rom, setRom] = useState([]);
  const [gen, setGenre] = useState([]);
  const [com, setCom] = useState([]);
  const [drama, setDrama] = useState([]);
  const apiKey = "543c959c84a2edaf19d168f7a042f6eb";
  const pages = 5;


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
            .then((json) => setRom(json.results))
            .catch((error) => console.error("Error fetching romance movies:", error));
        }
        window.scrollTo(0, 0);
      })
      .catch((error) => console.error("Error fetching genre list:", error));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())
      .then((json) => {
        // Find the genre ID for "Romance"
        const gen= json.genres.find((genre) => genre.name === "Adventure");
  
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
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())
      .then((json) => {
        // Find the genre ID for "Romance"
        const gen= json.genres.find((genre) => genre.name === "Comedy");
  
        if (gen) {
          // Now you can use the genre ID to fetch romance movies
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=543c959c84a2edaf19d168f7a042f6eb&with_genres=${gen.id}`
          )
            .then((response) => response.json())
            .then((json) => setCom(json.results))
            .catch((error) => console.error("Error fetching romance movies:", error));
        }
      })
      .catch((error) => console.error("Error fetching genre list:", error));
  }, []);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=543c959c84a2edaf19d168f7a042f6eb"
    )
      .then((response) => response.json())
      .then((json) => {
        // Find the genre ID for "Romance"
        const gen= json.genres.find((genre) => genre.name === "Action");
  
        if (gen) {
          // Now you can use the genre ID to fetch romance movies
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=543c959c84a2edaf19d168f7a042f6eb&with_genres=${gen.id}`
          )
            .then((response) => response.json())
            .then((json) => setDrama(json.results))
            .catch((error) => console.error("Error fetching romance movies:", error));
        }
      })
      .catch((error) => console.error("Error fetching genre list:", error));
  }, []);

  
  const override = {
    margin: '0 auto',
    borderColor: 'red'
  }
  return (

    <>
      <Navbar />
      <div className="ge">
            <>
            
            <h1 className="container-fluid pl-4 pt-4 pb-3">Romance</h1>
            <Caros>
                {rom.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>


            <h1 className="container-fluid pl-4 pt-4 pb-3">Action</h1>
            <Caros>
                {drama.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>

            <h1>Adventures</h1>
            <Caros>
                {com.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>
            <h1>Thriller</h1>
            <Caros>
                {gen.map((mov) => (
                  <CaroItems
                    title={mov.title}
                    id={mov.id}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    release_date={mov.release_date}
                  />
                ))}
              </Caros>
</>
        </div>
      <Footer />
    </>
  );
}
