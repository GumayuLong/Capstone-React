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

  fetchCinemaListApi(cinemaId) {
    return request({
      url: `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaId}`,
      method: "GET",
    });
  }

  fetchGetInfoLichChieuHeThongRapApi() {
    return request({
      url: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
      method: "GET",
    });
  }

  fetchCreateShowtime(data) {
    return request({
      url: `/QuanLyDatVe/TaoLichChieu`,
      method: "POST",
      data: data,
    });
  }
}

export const cinemaService = new CinemaService();
