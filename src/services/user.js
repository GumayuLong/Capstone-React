import { request } from "../configs/api";

class UserService {
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
