import React from "react";
import Carousel from "react-multi-carousel";
import BeatLoader from "react-spinners/ClipLoader";
import "./carousel.css";
import "react-multi-carousel/lib/styles.css";

function Caros({ children }) {
  return (
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
            min: 500,
          },
          items: 4,
          partialVisibilityGutter: 30,
        },
        xxsmall: {
          breakpoint: {
            max: 500,
            min: 350,
          },
          items: 3,
          partialVisibilityGutter: 30,
        },
        tiny: {
          breakpoint: {
            max: 350,
            min: 0,
          },
          items: 2,
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
      {children}
    </Carousel>
  );
}

export default Caros;
