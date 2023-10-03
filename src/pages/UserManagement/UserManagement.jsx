import React, { Fragment, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { userService } from "../../services/user";

import "./userManagement.scss";
import RegisterForm from "./components/RegisterForm";

export default function UserManagement() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    const result = await userService.fetchUserListApi();

    setUserList(result.data.content);
  };

  const renderUserList = () => {
    return userList.map((element, index) => {
      console.log(element.soDt);
      return (
        <tr
          className={(index + 1) % 2 === 0 ? "bg-light" : ""}
          key={element.taiKhoan}
        >
          <td align="center" width={100}>
            {index + 1}
          </td>
          <td>{element.hoTen}</td>
          <td>{element.taiKhoan}</td>
          <td>{element.soDT}</td>
          <td>{element.email}</td>
          <td align="center">
            {element.maLoaiNguoiDung === "QuanTri" ? (
              <FontAwesomeIcon className="check" icon={faCheck} />
            ) : (
              ""
            )}
          </td>
          <td align="center">
            {element.maLoaiNguoiDung === "KhachHang" ? (
              <FontAwesomeIcon className="check" icon={faCheck} />
            ) : (
              ""
            )}
          </td>
          <td align="center">
            <button className="btn btn-info mr-2">
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="btn btn-danger">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Fragment>
      <div className="d-flex align-item-center justify-content-end">
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <FontAwesomeIcon className="pr-2" icon={faPlus} />
          Thêm người dùng
        </button>
      </div>

      <RegisterForm />

      <table className="table table-bordered mt-2" style={{ fontSize: 18 }}>
        <thead className="bg-light p-2 text-center">
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Tài khoản</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Quản trị</th>
            <th>Khách hàng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>{renderUserList()}</tbody>
      </table>
    </Fragment>
  );
}
