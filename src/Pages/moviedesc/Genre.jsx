import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import BeatLoader from 'react-spinners/BeatLoader'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export default function MovieSelect() {
  const [rom, setRom] = useState([]);
  const [gen, setGenre] = useState([]);
  const [com, setCom] = useState([]);
  const [drama, setDrama] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const apiKey = "543c959c84a2edaf19d168f7a042f6eb";
  const pages = 5;

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    }, 1000)
  }, [])

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
      <>
          {loading ? (
            <div className=" spin ">
              <BeatLoader color="white" cssOverride={override} loading={loading} size={50} />
            </div>
          ) : (
            <>
            <h1 className="container-fluid pl-4 pt-4 pb-3">Romance</h1>
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
            {rom.map((mov) => (
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


            <h1 className="container-fluid pl-4 pt-4 pb-3">Romance</h1>
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
            {drama.map((mov) => (
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

            <h1>Action</h1>
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
            {com.map((mov) => (
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
            <h1>Action</h1>
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
            {gen.map((mov) => (
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
</>
          )}
        </>
      
    </>
  );
}
