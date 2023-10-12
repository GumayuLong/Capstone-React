import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../../../services/movie";
import { formatDate } from "../../../../utils/date";
import "../../../../components/Modal/modal.scss";
import Popup from "../../../../components/Modal/Modal";
import "../../../../components/Modal/modal.scss";
import "../../movieDetail.scss";

export default function Detail() {
  const params = useParams();
  const [detail, setDetail] = useState({});
  const [trailer, setTrailer] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(params);
  useEffect(() => {
    fetchMovieDetail();
    fetchTrailer();
  }, []);

  const fetchMovieDetail = async () => {
    const result = await movieService.fetchMovieDetailApi(params.movieId);
    setDetail(result.data.content);
  };

  const fetchTrailer = async () => {
    const result = await movieService.fetchMovieListApi();
    setTrailer(result.data.content);
  };

  const openPopup = () => {
    setIsOpen(true);
    console.log(trailer);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="row">
      <div className="col-5 col-sm-5 col-md-4 col-xl-3">
        <img
          className="w-100"
          src={detail.hinhAnh}
          style={{ borderRadius: "10px" }}
        />
      </div>
      <div className="col-7 col-sm-7 col-md-8 col-xl-9">
        <h4>{detail.tenPhim}</h4>
        <p>{detail.moTa}</p>
        <p>{formatDate(detail.ngayKhoiChieu)}</p>
        <div>
          <button onClick={openPopup} className="btn button-primary mr-2">
            TRAILER
          </button>
          <Popup isOpen={isOpen} onClose={closePopup}>
            {/* <h2>Hello, this is a popup!</h2> */}

            <iframe
              className="trailer"
              src="https://www.youtube.com/embed/0tFUfuEhh28?si=Ey_-hpMwKQMEqxF-"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </Popup>
        </div>
      </div>
    </div>
  );
}
