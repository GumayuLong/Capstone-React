/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { movieService } from "../../services/movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Slick library
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./home.scss";
import { bannerService } from "../../services/banner";
import {
  faAngleRight,
  faAnglesRight,
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons";
import { cinemaService } from "../../services/cinema";

export default function Home() {
  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [heThongCumRap, setHeThongCumRap] = useState([]);
  const [getListCumRap, setGetListCumRap] = useState({});
  const [getHeThongLichChieu, setHeThongLichChieu] = useState({});

  useEffect(() => {
    fetchMovieList();
    fetchBannerList();
    fetchGetInfoHeThongRap();
    fetchGetInfoLichChieuHeThongRap();
  }, []);

  const fetchMovieList = async () => {
    const result = await movieService.fetchMovieListApi();
    setMovieList(result.data.content);
  };

  const fetchBannerList = async () => {
    const result = await bannerService.fetchBannerListApi();
    // console.log(result);
    setBannerList(result.data.content);
  };

  const fetchGetInfoHeThongRap = async () => {
    const result = await cinemaService.fetchCinemaApi();
    setCinema(result.data.content);
  };

  const fetchGetInfoLichChieuHeThongRap = async () => {
    const result = await cinemaService.fetchGetInfoLichChieuHeThongRapApi();
    console.log(result.data.content);
    setGetListCumRap(result.data.content);
  };

  const handleChangeHeThongRap = (rap) => {
    const data = [...getListCumRap];

    const idx = data.findIndex(
      (element) => element.maHeThongRap === rap.maHeThongRap
    );

    const cumRap = data.filter(
      (element) =>
        // console.log(element.maHeThongRap)
        element.maHeThongRap === data[idx].maHeThongRap
    );

    setHeThongCumRap(cumRap[0].lstCumRap);
  };

  // const handleLichChieuCumRap = (rap) => {
  // 	const data = [...getListCumRap];

  // 	const idx = data.findIndex(
  // 		(element) => element.maHeThongRap === rap.maHeThongRap
  // 	);

  // 	const lichChieu = data.filter(
  // 		(element) =>
  // 			// console.log(element.maHeThongRap)
  // 			element.maHeThongRap === data[idx].maHeThongRap
  // 	);

  // 	console.log(lichChieu[0].lstCumRap);
  // 	setHeThongLichChieu(lichChieu[0].lstCumRap);
  // };

  // const renderLichChieu = () => {
  // 	return heThongCumRap.map((element) => {
  // 		return <button onClick={handleLichChieuCumRap(element)}></button>;
  // 	});
  // }

  const renderCumRap = () => {
    return heThongCumRap.map((element) => {
      return (
        <button
          className="buttonCustom"
          style={{ display: "flex", alignItems: "center" }}
        >
          <strong className="multitabWrapper">
            <div>
              <h4 className="htrtitle">{element.tenCumRap}</h4>
              <h6 className="address">{element.diaChi}</h6>
              <a className="btnChiTiet" href="/">
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  style={{ paddingRight: 5 }}
                />
                Chi tiết
              </a>
            </div>
          </strong>
          {/* <span></span> */}
        </button>
      );
    });
  };

  const renderMovieList = () => {
    // console.log(movieList)

    const limitedMovieList = movieList.slice(0, 8);

    return limitedMovieList.map((element) => {
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

  const renderListGetInfoHeThongRap = () => {
    // console.log(cinema)
    return cinema.map((element) => {
      return (
        <div className="borderbutton">
          <button
            className="buttonLogo"
            onClick={() => {
              handleChangeHeThongRap(element);
            }}
          >
            <span className="multiWrapper">
              <div className="">
                <img className="logo" src={element.logo} alt={element.biDanh} />
              </div>
            </span>
          </button>
        </div>
      );
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Fragment>
      <section className="carosel">
        <Slider {...settings}>
          {bannerList.map((element) => (
            <div key={element.maBanner}>
              <img className="img-fluid" src={element.hinhAnh} />
            </div>
          ))}
        </Slider>
      </section>
      <div className="mx-auto my-5 container">
        <h1 className="text-center my-5">MOVIE SELECTION</h1>
        <div className="row">{renderMovieList()}</div>
        <Link
          to="/movie-selection"
          className="d-flex justify-content-center"
          style={{ fontSize: 18 }}
        >
          Xem thêm
        </Link>
      </div>
      <div
        className="muiContainer multiContainer"
        style={{ marginBottom: "90px" }}
      >
        <div className="lichchieu">
          <div className="tabVertical">
            <div
              className="multitabsScroller multitabsFix"
              style={{ overflow: "hidden" }}
            >
              <div className="flexContainer">
                {renderListGetInfoHeThongRap()}
              </div>
            </div>
          </div>
          {/* <span className="activeSpan"></span> */}
        </div>
        <div className="verticalTabpanel">
          <div className="multitabVertical">
            <div className="multitabsScroller">
              <div className="flexContainer">{renderCumRap()}</div>
            </div>
          </div>
        </div>
        <div className="movie-list">
          {/* <div>{renderLichChieu()}</div> */}
          <div className="movie-item">
            <img
              className="card-img-top"
              src="https://movienew.cybersoft.edu.vn/hinhanh/death-note_gp01.jpg"
              alt="movie"
              style={{ width: 100, objectFit: "contain" }}
            />

            <div className="movie-info">
              <h5>Death Note</h5>
              <div className="movie-datetime">
                <p className="date">10/10/2023</p>
                <div className="movie-time">
                  <p className="active">14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-item">
            <img
              className="card-img-top"
              src="https://movienew.cybersoft.edu.vn/hinhanh/death-note_gp01.jpg"
              alt="movie"
              style={{ width: 100, objectFit: "contain" }}
            />

            <div className="movie-info">
              <h5>Death Note</h5>
              <div className="movie-datetime">
                <p className="date">10/10/2023</p>
                <div className="movie-time">
                  <p className="active">14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-item">
            <img
              className="card-img-top"
              src="https://movienew.cybersoft.edu.vn/hinhanh/death-note_gp01.jpg"
              alt="movie"
              style={{ width: 100, objectFit: "contain" }}
            />

            <div className="movie-info">
              <h5>Death Note</h5>
              <div className="movie-datetime">
                <p className="date">10/10/2023</p>
                <div className="movie-time">
                  <p className="active">14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-item">
            <img
              className="card-img-top"
              src="https://movienew.cybersoft.edu.vn/hinhanh/death-note_gp01.jpg"
              alt="movie"
              style={{ width: 100, objectFit: "contain" }}
            />

            <div className="movie-info">
              <h5>Death Note</h5>
              <div className="movie-datetime">
                <p className="date">10/10/2023</p>
                <div className="movie-time">
                  <p className="active">14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-item">
            <img
              className="card-img-top"
              src="https://movienew.cybersoft.edu.vn/hinhanh/death-note_gp01.jpg"
              alt="movie"
              style={{ width: 100, objectFit: "contain" }}
            />

            <div className="movie-info">
              <h5>Death Note</h5>
              <div className="movie-datetime">
                <p className="date">10/10/2023</p>
                <div className="movie-time">
                  <p className="active">14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-item">
            <img
              className="card-img-top"
              src="https://movienew.cybersoft.edu.vn/hinhanh/death-note_gp01.jpg"
              alt="movie"
              style={{ width: 100, objectFit: "contain" }}
            />

            <div className="movie-info">
              <h5>Death Note</h5>
              <div className="movie-datetime">
                <p className="date">10/10/2023</p>
                <div className="movie-time">
                  <p className="active">14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-item">
            <img
              className="card-img-top"
              src="https://movienew.cybersoft.edu.vn/hinhanh/death-note_gp01.jpg"
              alt="movie"
              style={{ width: 100, objectFit: "contain" }}
            />

            <div className="movie-info">
              <h5>Death Note</h5>
              <div className="movie-datetime">
                <p className="date">10/10/2023</p>
                <div className="movie-time">
                  <p className="active">14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                  <p>14:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
