import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminGuard(props) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    // Chưa đăng nhập
    if (!userState.userInfo) {
      notification.warning({
        message: "Vui lòng đăng nhập!",
        placement: "bottomRight",
      });

      navigate("/login");
    } else {
      if (userState.userInfo.maLoaiNguoiDung !== "QuanTri") {
        notification.warning({
          message: "Bạn không có quyền truy cập!",
          placement: "bottomRight",
        });
        navigate("/");
      }
    }
  }, []);

  return <>{props.children}</>;
}
