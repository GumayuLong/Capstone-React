import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserType } from "../enums/api";

export default function AdminGuard(props) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!userState.userInfo) {
      notification.warning({
        message: "Chưa đăng nhập không thể vào trang admin",
        placement: "topRight",
      });
      navigate("/login");
    } else {
      if (userState.userInfo.maLoaiNguoiDung !== UserType.QuanTri) {
        notification.warning({
          message: "Tài khoản của bạn không có quyền truy cập",
          placement: "topRight",
        });

        navigate("/");
      }
    }
  }, []);
  return <>{props.children}</>;
}
