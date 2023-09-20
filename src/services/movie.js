import { request } from "../configs/api";

class MovieService {
    fetchMovieListApi() {
    return request({
      url: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      method: "GET",
      
    });
    }
} 
export const movieService = new MovieService();