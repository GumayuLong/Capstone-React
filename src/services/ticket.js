import { request } from "../configs/api";

class TicketService{
    fetchTicketDetailApi(Id){
        return request({
			url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${Id}`,
            method: "GET",
		});
    }
}

export const ticketService = new TicketService();