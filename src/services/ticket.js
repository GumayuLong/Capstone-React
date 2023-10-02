import { request } from "../configs/api";

class TicketService {
	fetchTicketDetailApi(Id) {
		return request({
			url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${Id}`,
			method: "GET",
		});
	}

	bookTicketApi(data) {
		return request({
			url: `/QuanLyDatVe/DatVe`,
			method: "POST",
			data,
		});
	}
}

export const ticketService = new TicketService();