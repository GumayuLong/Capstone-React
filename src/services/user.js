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

  fetchCreateUserApi(data) {
    return request({
      url: "/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data,
    });
  }
}

export const userService = new UserService();
