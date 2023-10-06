import { request } from "../configs/api";

class MovieService {
  fetchMovieListApi() {
    return request({
      url: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
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

  fetchMovieUpdateApi(id) {
    return request({
      url: `/QuanLyPhim/CapNhatPhimUpload/${id}`,
      method: "POST",
    });
  }

  fetchMovieDeletApi(id) {
    return request({
      url: `/QuanLyPhim/XoaPhim/${id}`,
      method: "DELETE",
    });
  }
}
export const movieService = new MovieService();
