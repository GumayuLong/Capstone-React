/** @format */

import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";
import { setUserInfoAction } from "../../store/actions/userAction";
import { notification } from "antd";
import { validation } from "../../validations/validation";
import "../Login/login.scss";
import { faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Login/login.scss";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameInputRef = createRef();
  const fullNameInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();
  const emailInputRef = createRef();
  const phoneNumberInputRef = createRef();

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  // Handle change event
  const handleChangeRegister = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword({
      ...confirmPassword,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    // CHECK VALIDATION USERNAME
    isValid &= validation.validateRequired(
      state.taiKhoan,
      usernameInputRef.current,
      "Vui lòng nhập tài khoản!"
    );

    // CHECK VALIDATION PASSWORD
    isValid &= validation.validateRequired(
      state.matKhau,
      passwordInputRef.current,
      "Vui lòng nhập mật khẩu!"
    );

    // CHECK VALIDATION CONFIRM PASSWORD
    isValid &=
      validation.validateRequired(
        confirmPassword,
        confirmPasswordInputRef.current,
        "Vui lòng xác nhận lại mật khẩu!"
      ) &&
      validation.validateConfirmPassword(
        state.matKhau,
        confirmPassword.confirmPassword,
        confirmPasswordInputRef.current,
        "Vui lòng nhập lại đúng mật khẩu ở trên!"
      );

    // CHECK VALIDATION FULL NAME
    isValid &=
      validation.validateRequired(
        state.hoTen,
        fullNameInputRef.current,
        "Vui lòng nhập họ tên!"
      ) &&
      validation.validateFullName(
        state.hoTen,
        fullNameInputRef.current,
        "Vui lòng nhập họ tên là ký tự chữ!"
      );

    // CHECK VALIDATION EMAIL
    isValid &=
      validation.validateRequired(
        state.email,
        emailInputRef.current,
        "Vui lòng nhập email!"
      ) &&
      validation.validateWithRegex(
        state.email,
        emailInputRef.current,
        "Vui lòng nhập đúng định dạng email!",
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );

    // CHECK VALIDATION PHONE NUMBER
    isValid &=
      validation.validateRequired(
        state.soDt,
        phoneNumberInputRef.current,
        "Vui lòng nhập số điện thoại!"
      ) &&
      validation.validateWithRegex(
        state.soDt,
        phoneNumberInputRef.current,
        "Vui lòng nhập số điện thoại là ký tự chữ số!",
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      );

    if (isValid) {
      await userService
        .register(state)
        .then((result) => {
          dispatch(setUserInfoAction(result.data.content));
          notification.success({
            message: "Đăng ký thành công",
            placement: "topLeft",
          });
          setErrMessage("");
          navigate("/login");
        })
        .catch((err) => {
          setErrMessage(err.response.data.content);
          phoneNumberInputRef.current.innerHTML = errMessage;
        });
    }
  };

  return (
    <div className="bgcustom">
      <main className="main">
        <div className="form" style={{ top: "45%" }}>
          <div className="w-75 mx-auto py-5">
            <div style={{ textAlign: "center" }}>
              <FontAwesomeIcon className="icon" icon={faRightToBracket} />
            </div>
            <h1 className="title">Đăng ký</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  placeholder="Tên tài khoản*"
                  onChange={handleChangeRegister}
                  name="taiKhoan"
                  type="text"
                  className="form-control"
                />
                <p ref={usernameInputRef} className="text-danger"></p>
              </div>
              <div className="form-group">
                <input
                  placeholder="Mật khẩu*"
                  onChange={handleChangeRegister}
                  name="matKhau"
                  type="password"
                  className="form-control"
                />
                <p ref={passwordInputRef} className="text-danger"></p>
              </div>
              <div className="form-group">
                <input
                  placeholder="Nhập lại mật khẩu*"
                  onChange={handleChangeConfirmPassword}
                  id="confirmPassword"
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                />
                <p ref={confirmPasswordInputRef} className="text-danger"></p>
              </div>
              <div className="form-group">
                <input
                  placeholder="Họ và tên*"
                  onChange={handleChangeRegister}
                  name="hoTen"
                  type="text"
                  className="form-control"
                />
                <p ref={fullNameInputRef} className="text-danger"></p>
              </div>
              <div className="form-group">
                <input
                  placeholder="Email*"
                  onChange={handleChangeRegister}
                  name="email"
                  type="text"
                  className="form-control"
                />
                <p ref={emailInputRef} className="text-danger"></p>
              </div>
              <div className="form-group">
                <input
                  placeholder="Số điện thoại*"
                  onChange={handleChangeRegister}
                  name="soDt"
                  type="text"
                  className="form-control"
                />
                <p ref={phoneNumberInputRef} className="text-danger">
                  {errMessage}
                </p>
              </div>
              <button className="btn btn-success btncustom">Đăng ký</button>
              <div>
                <a href="/login">
                  <h3 className="connectlink">Quay lại đăng nhập?</h3>
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
