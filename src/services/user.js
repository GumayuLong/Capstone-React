/** @format */

import { request } from "../configs/api";

class UserService {
  loginApi(data) {
    return request({
      url: `/QuanLyNguoiDung/DangNhap`,
      method: "POST",
      data,
    });
  }

  register(data) {
    return request({
      url: `/QuanLyNguoiDung/DangKy`,
      method: "POST",
      data,
    });
  }

  fetchUserListApi() {
    return request({
      url: "/QuanLyNguoiDung/LayDanhSachNguoiDung",
      method: "GET",
    });
  }

  fetchUserTypeListApi() {
    return request({
      url: "/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
      method: "GET",
    });
  }

  fetchUserDetailApi(username) {
    return request({
      url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${username}`,
      method: "POST",
    });
  }

  fetchCreateUserApi(data) {
    return request({
      url: "/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data,
    });
  }

  fetchUpdateUserApi() {
    return request({
      url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "POST",
    });
  }

  fetchDeleteUserApi(username) {
    return request({
      url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${username}`,
      method: "DELETE",
    });
  }
}

export const userService = new UserService();
