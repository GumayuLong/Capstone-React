import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../services/movie";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./movieSelection.scss";

export default function MovieSelection() {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const result = await movieService.fetchMovieListApi();
    setMovieList(result.data.content);
  };

  const renderMovieList = () => {
    return movieList.map((element) => {
      return (
        <div
          key={element.id}
          className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 item"
        >
          <div
            className="card movie-card"
            style={{ marginBottom: 20, height: 500 }}
          >
            <img
              style={{ height: 350, objectFit: "cover" }}
              className="card-img-top"
              src={element.hinhAnh}
              alt="movie"
            />
            <div className="card-body">
              <div>
                <h5 className="card-title titleFilm">{element.tenPhim}</h5>
                {/* <div>
                    <h4 className="descriptionFilm">{element.moTa}</h4>
                  </div> */}
                <div className="button-group">
                  <button
                    onClick={() => navigate(`/movie-detail/${element.maPhim}`)}
                    className="btn buttonDetail w-100"
                  >
                    <FontAwesomeIcon
                      icon={faHandPointRight}
                      style={{ marginRight: "10px" }}
                    />
                    XEM CHI TIẾT
                  </button>
                  {/* <button
                      onClick={() =>
                        navigate(`/booking/${element.maLichChieu}`)
                      }
                      className="btn btn-warning w-50"
                    >
                      BOOKING
                    </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mx-auto my-5 container">
      <h1 className="text-center my-5">MOVIE SELECTION</h1>
      <div className="row">{renderMovieList()}</div>
    </div>
  );
}
