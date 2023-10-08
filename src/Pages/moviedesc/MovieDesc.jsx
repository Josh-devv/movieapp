import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useWatchlist } from "../../components/watchlist/WatchList";
import { IoMdStar } from "react-icons/io";
import ClockLoader from "react-spinners/CircleLoader";
import { HiOutlinePlus } from "react-icons/hi";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Popup from "../../components/popup/Popup";
import BeatLoader from 'react-spinners/ClipLoader'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../../Anim/animations.css'
import "./movie.css";




export default function MovieDesc() {

  const [add, setAdded] = useState("Add to WatchList")
  const loc = useLocation(); //to bring the location of the page
  const { id } = useParams(); //taking the id from the routes using useParams which passed thru the routes
  const [mdetails, setMdetails] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { watchlist, addToWatchlist } = useWatchlist();
  const [clicked, setClicked] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);






  const handleAddToWatchlist = () => {
    addToWatchlist(mdetails);
    setClicked(true);

    setShowPopUp(true)

    setTimeout(() => {
      setShowPopUp(false)
    }, 1500);

  }


  const disStyle = {
    backgroundColor: 'gray',
    cursor: 'not-allowed',
    color: 'white'
  }
  
  useEffect(()=>{
    setLoading(true)
        setTimeout(()=>{
          setLoading(false)
        }, 1000)
  },[id])

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

    window.scrollTo(0, 0);
    //for it to go back to the top of the page onClick of any Link
  }, [loc]); //by passing in the useLocation hook


  const override = {
    margin: "0 auto",
    borderColor: "white",
  };

  return (
    <>
    {
      loading ? (
        <div className=" spin ">
        <BeatLoader color="white" cssOverride={override} loading={loading} size={50} />
        </div>
      ) : (

      
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

              <button
                className="desc-button1"
                onClick={() => handleAddToWatchlist()}
              >
                <HiOutlinePlus />
                <span>{add}</span>
              </button>
            </div>
            {showPopUp ? (
              <div className="popup">
                <Popup />
              </div>
            ) : (
              ""
            )}
          </div>
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
            //this is the carousel from react-multi-slider
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
                    min: 0,
                  },
                  items: 3,
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
              {weekly.map((mov) => (
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
                      <small className=" year"></small>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          )}
        </div>

        <Footer />
      </section>
      </>
      )
    }
     
    </>
  );
}
