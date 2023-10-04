import { request } from "../configs/api";

class CinemaService {
	fetchShowtimesApi(movieId) {
		return request({
			url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
			method: "GET",
		});
	}

	fetchCinemaApi() {
		return request({
			url: `QuanLyRap/LayThongTinHeThongRap`,
			method: "GET",
		});
	}

  fetchGetInfoLichChieuHeThongRapApi(){
    return request({
		url: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
		method: "GET",
	});
  }
}

export const cinemaService = new CinemaService();
