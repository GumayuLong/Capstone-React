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
	Exist(data, group) {
		return request({
			url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`,
			method: "GET",
			data,
		});
	}
}

export const userService = new UserService();
