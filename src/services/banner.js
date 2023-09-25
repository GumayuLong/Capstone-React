import { request } from "../configs/api";

class BannerService {
  fetchBannerListApi() {
    return request({
      url: "/QuanLyPhim/LayDanhSachBanner",
      method: "GET",
    });
  }
}
export const bannerService = new BannerService();
