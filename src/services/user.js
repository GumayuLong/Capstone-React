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

  fetchSearchUserApi(keyword) {
    return request({
      url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`,
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

  fetchUpdateUserApi(data) {
    return request({
      url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "POST",
      data: data,
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
