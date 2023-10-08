import React from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import './carousel.css'

function CaroItems(props) {
  return (
    <Link className="carous" to={{ pathname: `/movie/${props.id}` }} key={props.id}>
      <img src={`https://image.tmdb.org/t/p/w500${props.poster_path}`} alt="" />

      <div className="content">
        <span className="title">{props.title}</span>
        <div className="rat">
          <small className="details">
            <IoMdStar size={20} color="yellow" />
            {props.vote_average}
          </small>
          <small className="date">{props.release_date.split("-")[0]}</small>
        </div>
      </div>
    </Link>
  );
}
export default CaroItems;
