/** @format */

import React, { useEffect, useState } from "react";
import { cinemaService } from "../../../../services/cinema";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../../../utils/date";
import "./showtimes.scss";

export default function Showtimes() {
	const [data, setData] = useState([]);
	const params = useParams();
	useEffect(() => {
		fetchShowtimes();
	}, []);
	const fetchShowtimes = async () => {
		const result = await cinemaService.fetchShowtimesApi(params.movieId);
		setData(result.data.content.heThongRapChieu);
	};

	const renderTabList = () => {
		return data.map((element, idx) => {
			return (
				<a
					key={element.maHeThongRap}
					class={`nav-link text-capitalize ${
						idx === 0 && "active"
					} cumrap`}
					data-toggle="pill"
					href={`#${element.maHeThongRap}`}
					role="tab"
					aria-selected="true"
				>
					{element.tenHeThongRap}
				</a>
			);
		});
	};

	const renderTabContent = () => {
		return data.map((element, idx) => {
			return (
				<div
					key={element.maHeThongRap}
					class={`tab-pane fade show ${idx === 0 && "active"}`}
					id={element.maHeThongRap}
					role="tabpanel"
				>
					{element.cumRapChieu.map((element) => {
						return (
							<div key={element.maCumRap} class="row mb-5">
								<div class="col-1">
									<img
										class="img-fluid rounded"
										src={element.hinhAnh}
									/>
								</div>
								<div class="col-11 pl-0">
									<h5>{element.tenCumRap}</h5>
									<span
										class="text-danger"
										style={{
											fontStyle: "italic",
											textTransform: "uppercase",
										}}
									>
										{element.diaChi}
									</span>
								</div>
								<div class="col-12">
									<div
										class="row"
										style={{
											backgroundColor: "#fff",
											borderRadius: "10px",
											height: "50px",
											display: "flex",
											alignItems: "center",
											marginTop: "12px",
										}}
									>
										{element.lichChieuPhim.map(
											(element) => {
												return (
													<div
														key={element.maRap}
														class="col-4"
													>
														<Link
															to={`/booking/${element.maLichChieu}`}
														>
															{formatDate(
																element.ngayChieuGioChieu
															)}
														</Link>
													</div>
												);
											}
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			);
		});
	};

	return (
		<div class="row">
			<div class="col-3">
				<div
					class="nav flex-column nav-pills"
					id="v-pills-tab"
					role="tablist"
					aria-orientation="vertical"
				>
					{renderTabList()}
				</div>
			</div>
			<div class="col-9">
				<div class="tab-content" id="v-pills-tabContent">
					{renderTabContent()}
				</div>
			</div>
		</div>
	);
}
