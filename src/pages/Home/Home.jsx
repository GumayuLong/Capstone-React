import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../services/movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Slick library
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./home.scss";
import { bannerService } from "../../services/banner";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
	const navigate = useNavigate();
	const [movieList, setMovieList] = useState([]);
	const [bannerList, setBannerList] = useState([]);

	useEffect(() => {
		fetchMovieList();
		fetchBannerList();
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

	const renderMovieList = () => {
		// console.log(movieList)
		return movieList.map((element) => {
			return (
				<div key={element.id} className="col-3 item">
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
								<h5 className="card-title titleFilm">
									{element.tenPhim}
								</h5>
								{/* <div>
									<h4 className="descriptionFilm">
										{element.moTa}
									</h4>
								</div> */}
								<div className="button-group">
									<button
										onClick={() =>
											navigate(
												`/movie-detail/${element.maPhim}`
											)
										}
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
			<div class="mx-auto my-5 w-65">
				<h1 className="text-center my-5">MOVIE SELECTION</h1>
				<div className="row">{renderMovieList()}</div>
			</div>
		</Fragment>
	);
}
