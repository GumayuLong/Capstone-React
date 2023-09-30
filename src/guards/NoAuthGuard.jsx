import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function NoAuthGuard(props) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    // Đã đăng nhập
    if (userState.userInfo) {
      navigate("/");
    }
  }, []);
  return <>{props.children}</>;
}
