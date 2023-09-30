import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./footer.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function CustomFooter() {
  const navigate = useNavigate();

  return (
    <footer className="navbar-dark bg-dark">
      <div className="mx-auto w-65">
        <div className="row">
          <div className="col-12 col-xl-3 col-md-12 col-sm-12">
            <div className="flex flex-col shop-info">
              <a className="navbar-brand" href="#">
                <h3 className="text-center">Cyber Cinema</h3>
              </a>
              <div className="social text-center">
                <a href="https://www.facebook.com/">
                  <FontAwesomeIcon className="social-icon" icon={faFacebookF} />
                </a>
                <a href="https://www.youtube.com/">
                  <FontAwesomeIcon className="social-icon" icon={faYoutube} />
                </a>
                <a href="https://www.tiktok.com/">
                  <FontAwesomeIcon className="social-icon" icon={faTiktok} />
                </a>
                <a href="https://www.twitter.com/">
                  <FontAwesomeIcon className="social-icon" icon={faTwitter} />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-3 col-md-4 col-sm-6">
            <div className="flex flex-col">
              <h5 className="my-2 pl-3 title-custom navbar-brand">
                GIỚI THIỆU
              </h5>
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
              <h5 className="my-2 pl-3 title-custom navbar-brand">GÓC PHIM</h5>
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
              <h5 className="my-2 pl-3 title-custom navbar-brand">HỖ TRỢ</h5>
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
