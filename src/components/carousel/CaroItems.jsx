import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import "./carousel.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CaroItems(props) {
  const [load, setLoad] = useState(false);

  return (
    <>
      <Link style={{display: load ? 'flex' : "none"}}
        className="carous"
        to={{ pathname: `/movie/${props.id}` }}
        key={props.id}
      >
        <img
          onLoad={() => {
            setLoad(true);
            console.log(load);
          }}
          src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
          alt=""
        />
        <div className="content">
          <span className="title">{props.title}</span>
          <div className="rat">
            <small className="details">
              <IoMdStar size={20} color="yellow" />
              {props.vote_average.toFixed(1)}
            </small>
            <small className="date">{props.release_date.split("-")[0]}</small>
          </div>
        </div>
      </Link>
      <div className="skeletons" style={{display: !load ? 'block' : 'none'}}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Skeleton className="rrr" />
        <Skeleton className="rrr1" />
        <Skeleton className="rrr2" />
      </SkeletonTheme>
      </div>
      
    </>
  );
}
export default CaroItems;
