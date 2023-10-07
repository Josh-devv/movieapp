import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import BeatLoader from 'react-spinners/BeatLoader'


export default function MovieSelect() {
  const [tvs, setTvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "543c959c84a2edaf19d168f7a042f6eb";
  const pages = 5;

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = [];
      for (let page = 1; page <= pages; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${page}`
        );
        const data = await response.json();
        movies.push(...data.results);
      }
      setTvs(movies);
      setLoading(false);
    };
console.log(setTvs);
    if (loading) {
      setTimeout(() => {
        alert('')
      }, 5000);
    }
    fetchMovies();
  }, [pages]);

  //console.log(popularMovies);
const override = {
  margin: '0 auto',
  borderColor: 'red'
}
  return (

    <>
      <Navbar />
    
    <section className="all-mov">
      <div className="head-app3">
        {loading ? (
          <div className=" spin ">
            <BeatLoader color="white" cssOverride={override} loading={loading} size={50} />
          </div>
        ) : (
          <div className="app3">
            {tvs.map((mov) => (
              <Link
                to={{ pathname: `/movie/${mov.id}`, state: { movie: mov } }}
                key={mov.id}
              >
                {loading ? (
                  <FaSpinner />
                ) : (
                  <>
                    <div className="carou-we color-white" key={mov.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                        alt=""
                      />
                      
                    </div>

                    <div className="head-info">
                      <span className="info">{mov.name}</span>
                      <div className="ratings ">
                        <small className="">
                          <IoMdStar size={20} color="yellow" />
                          {mov.vote_average}
                        </small>
                        <small className=" year">
                          {mov.first_air_date.split("-")[0]}
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
