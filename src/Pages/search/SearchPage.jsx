import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import ClockLoader from "react-spinners/CircleLoader";
import Navbar from "../../components/navbar/Navbar";
import Carousel from "react-multi-carousel";
import CaroItems from "../../components/carousel/CaroItems";
import Caros from "../../components/carousel/Carousel";
import "react-multi-carousel/lib/styles.css";
import "./search.css";

const API_URL = "https://api.themoviedb.org/3/search/movie?api_key=543c959c84a2edaf19d168f7a042f6eb";

export default function SearchPage() {

  const { title } = useParams(); //getting the value of title using useParams from the route
  const [weekly, setWeekly] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // for the spinner effect when it taking time to load
  //getting the title from the the route which is the value(inputed value) in the search bar
  const fett = async (title) => {
    fetch(`${API_URL}&query=${title}`)
      .then((response) => response.json())
      .then((json) => {
        setSearchResults(json.results);
        setLoading(false);
      });
  };

  useEffect(() => {
    fett(title);
  }, [title]);
  
  //for weekly rated movies from the api
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=543c959c84a2edaf19d168f7a042f6eb`
    )
      .then((response) => response.json())
      .then((json) => setWeekly(json.results))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, []);

  const override = {
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <>
    <Navbar />
      <div className="body">
        <h3 className="label">Movies Labeled "{title}"...</h3>
        <div className="container-fluid hea ">
          <Caros>
            {searchResults.map((mov) =>( 
                <CaroItems
                title={mov.title}
                id={mov.id}
                poster_path={mov.poster_path}
                vote_average={mov.vote_average}
                release_date={mov.release_date} />
                ))}
          </Caros>
        </div>

        <div>
          <h5 className="container-fluid genre pt-5">Weekly Rated Movies</h5>
            <Caros>
              {weekly.map((mov) => (
                <CaroItems
                title={mov.title}
                id={mov.id}
                poster_path={mov.poster_path}
                vote_average={mov.vote_average}
                release_date={mov.release_date} />
              ))}
            </Caros>
          </div>
          </div>
      

        <Footer />
      
    </>
  );
}
