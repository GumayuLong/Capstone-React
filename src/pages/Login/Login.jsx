import React, { createRef, useState } from "react";
import { userService } from "../../services/user";
import { useDispatch } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { validation } from "../../validations/validation";
import "./login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Form, Input } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accountInputRef = createRef();
  const passwordInputRef = createRef();

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [_, setPosts] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [__, setPassword] = useState("password");

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    // CHECK VALIDATION ACCOUNT LOGIN
    isValid &= validation.validateRequired(
      state.taiKhoan,
      accountInputRef.current,
      "Vui lòng nhập tài khoản!"
    );

    // CHECK VALIDATION PASSWORD ACCOUNT LOGIN
    isValid &= validation.validateRequired(
      state.matKhau,
      passwordInputRef.current,
      "Vui lòng nhập mật khẩu!"
    );

    if (isValid) {
      await userService
        .loginApi(state)
        .then((result) => {
          localStorage.setItem(
            "USER_INFO",
            JSON.stringify(result.data.content)
          );
          dispatch(setUserInfoAction(result.data.content));
          setErrMessage("");
          navigate("/");
        })
        .catch((err) => {
          setPosts(err.data);
          setErrMessage(err.response.data.content);
          passwordInputRef.current.innerHTML = errMessage;
        });
    }
  };

  return (
    <div className="bgcustom">
      <main className="main">
        <div className="form">
          <div className="w-75 mx-auto py-5">
            <div style={{ textAlign: "center" }}>
              <FontAwesomeIcon className="icon" icon={faUser} />
            </div>
            <h1 className="title">Đăng nhập</h1>
            <form onSubmit={handleSubmit}>
              <Form.Item>
                <Input
                  placeholder="Tài khoản*"
                  onChange={handleChange}
                  name="taiKhoan"
                  type="text"
                  size="large"
                />
              </Form.Item>
              <p
                ref={accountInputRef}
                className="text-danger"
                style={{ marginTop: "-20px" }}
              ></p>
              <Form.Item>
                <Input.Password
                  placeholder="Mật khẩu*"
                  onChange={handleChange}
                  name="matKhau"
                  size="large"
                />
              </Form.Item>
              <p
                ref={passwordInputRef}
                className="text-danger"
                style={{ marginTop: "-20px" }}
              >
                {errMessage}
              </p>
              <button className="btn btn-primary btncustom">Đăng nhập</button>
              <div>
                <a href="/register">
                  <h3 className="connectlink">
                    Bạn chưa có tài khoản? Đăng ký
                  </h3>
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
