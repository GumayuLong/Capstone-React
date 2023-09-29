import React, { Fragment, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { userService } from "../../services/user";

import "./userManagement.scss";
import RegisterForm from "./RegisterForm";

export default function UserManagement() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const result = await userService.fetchUserListApi();

    setUserList(result.data.content);
  };

  const renderUserList = () => {
    return userList.map((element, index) => {
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
          <td>{element.soDt}</td>
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
            <button className="btn btn-info mr-2">Edit</button>
            <button className="btn btn-danger">Delete</button>
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
          Add
        </button>
      </div>

      <RegisterForm />

      <table className="table table-bordered mt-2" style={{ fontSize: 18 }}>
        <thead className="bg-light p-2 text-center">
          <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Customer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderUserList()}</tbody>
      </table>
    </Fragment>
  );
}
