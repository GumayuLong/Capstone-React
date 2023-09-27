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
			url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy`,
			method: "POST",
			data,
		});
	}
}

export const userService = new UserService();
