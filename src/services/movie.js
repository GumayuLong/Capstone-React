import { request } from "../configs/api";

class MovieService {
    fetchMovieListApi() {
    return request({
      url: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      method: "GET",
      
    });
    };
    fetchMovieDetailApi(movieId) {
      return request({
			url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
			method: "GET",
		});
    }
} 
export const movieService = new MovieService();