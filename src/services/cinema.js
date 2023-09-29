import { request } from "../configs/api";

class CinemaService {
  fetchShowtimesApi(movieId) {
    return request({
      url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
      method: "GET",
    });
  }
}

export const cinemaService = new CinemaService();
