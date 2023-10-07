import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { useParams } from "react-router-dom";


import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import ClockLoader from "react-spinners/CircleLoader";
import Navbar from "../../components/navbar/Navbar";


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
                  <div className="carou-we color-white">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                      alt=""
                    />
                  </div>
                  <div className="head-info">
                    <span className="info0 pl-3">{mov.title}</span>
                    <div className="container-fluid ratings-w5">
                      <small className="">
                        <IoMdStar size={20} color="yellow" />
                        {mov.vote_average}
                      </small>
                      <small className="">
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
          {weekly.map((mov) => (
            <Link to={{ pathname: `/movie/${mov.id}` }} key={mov.id}>
              <div className="carou-we color-white">
                <img
                  src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                  alt=""
                />
              </div>
              <div className="head-info0">
                <span className="info pl-3 pt-3">{mov.title}</span>
                <div className="container-fluid ratings-w6">
                  <small className="">
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
          </div>
          </div>
      

        <Footer />
      
    </>
  );
}
