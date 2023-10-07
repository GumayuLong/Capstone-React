import { request } from "../configs/api";

class MovieService {
  fetchMovieListApi() {
    return request({
      url: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      method: "GET",
    });
  }

  fetchSearchMovieApi(movie) {
    return request({
      url: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${movie}`,
      method: "GET",
    });
  }

  fetchMovieDetailApi(movieId) {
    return request({
      url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
      method: "GET",
    });
  }

  fetchMovieCreateApi(formData) {
    return request({
      url: `/QuanLyPhim/ThemPhimUploadHinh`,
      method: "POST",
      data: formData,
    });
  }

  fetchMovieUpdateApi(formData) {
    return request({
      url: `/QuanLyPhim/CapNhatPhimUpload`,
      method: "POST",
      data: formData,
    });
  }

  fetchMovieDeletApi(id) {
    return request({
      url: `/QuanLyPhim/XoaPhim?MaPhim=${id}`,
      method: "DELETE",
    });
  }
}
export const movieService = new MovieService();
