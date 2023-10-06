import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import ClockLoader from "react-spinners/CircleLoader";
import Navbar from "../../components/navbar/Navbar";

import "./search.css";

const API_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=543c959c84a2edaf19d168f7a042f6eb";

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
        <div className="container-fluid head-app2">
          {loading ? (
            <div className=" spins2 w-100">
              <ClockLoader
                color="white"
                cssOverride={override}
                loading={loading}
                size={30}
              />
            </div>
          ) : (
            searchResults.map((mov) => (
              <div className="app2">
                <Link to={{ pathname: `/movie/${mov.id}` }}>
                  <div className=".carou-p color-white">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                      alt=""
                    />
                  </div>
                  <div className="head-info">
                    <span className="info pl-3">{mov.title}</span>
                    <div className="container-fluid ratings-s d-flex">
                      <small className="d-flex justify-content-center align-items-center">
                        <IoMdStar size={20} color="yellow" />
                        {mov.vote_average}
                      </small>
                      <small className=" year">
                        {mov.release_date.split("-")[0]}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        <div>
          <h5 className="container-fluid genre pt-5">Weekly Rated Movies</h5>
          <div className="head-app2">
            {loading ? (
              <div className=" spins2 w-100">
                <ClockLoader
                  color="white"
                  cssOverride={override}
                  loading={loading}
                  size={30}
                />
              </div>
            ) : (
              weekly.map((week) => (
                <div className="app2">
                  <Link to={{ pathname: `/movie/${week.id}` }} key={week.id}>
                    <div className=".carou-p color-white">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${week.poster_path}`}
                        alt=""
                      />
                    </div>
                    <div className="head-info">
                      <span className="info pl-3">{week.title}</span>
                      <div className="container-fluid ratings-s d-flex">
                        <small className="d-flex justify-content-center align-items-center">
                          <IoMdStar size={20} color="yellow" />
                          {week.vote_average}
                        </small>

                        {week.release_date &&
                        week.release_date.split("-")[0] ? (
                          <small>{week.release_date.split("-")[0]}</small>
                        ) : (
                          <small>Release date not available</small>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
