import React from "react";

import "./footer.scss";
export default function Footer() {
  return (
    <footer className="bg-light">
      <div className="mx-auto w-65">
        <div className="row">
          <div className="col-12 col-xl-3 col-md-12 col-sm-12">
            <div className="flex flex-col shop-info">
              <h3 className="text-100 text-black text-center">Cyber Cinema</h3>
            </div>
          </div>
          <div className="col-12 col-xl-3 col-md-4 col-sm-6">
            <div className="flex flex-col">
              <h5 className="my-2 pl-3 title-custom">GIỚI THIỆU</h5>
              <ul className="list-unstyled my-2">
                <li>
                  <a className="pl-4 py-2" href="#">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Thỏa thuận sử dụng
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Quy chế hoạt động
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-xl-3 col-md-4 col-sm-6">
            <div className="flex flex-col">
              <h5 className="my-2 pl-3 title-custom">GÓC PHIM</h5>
              <ul className="list-unstyled my-2">
                <li>
                  <a className="pl-4 py-2" href="#">
                    Thể loại phim
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Bình luận phim
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Blog điện ảnh
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Phim hay tháng
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-xl-3 col-md-4 col-sm-6">
            <div className="flex flex-col">
              <h5 className="my-2 pl-3 title-custom">HỖ TRỢ</h5>
              <ul className="list-unstyled my-2">
                <li>
                  <a className="pl-4 py-2" href="#">
                    Góp ý
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Rạp / Giá vé
                  </a>
                </li>
                <li>
                  <a className="pl-4 py-2" href="#">
                    Hạng vé
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
