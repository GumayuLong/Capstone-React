import React, { Fragment, useEffect, useState } from "react";
import { Button, Input, Table, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userService } from "../../services/user";

import "./userManagement.scss";

import {
  faCheck,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function UserManagement() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    const result = await userService.fetchUserListApi();

    setUserList(result.data.content);
  };

  const handleDeleteUser = async (object) => {
    const confirm = window.confirm(
      "Bạn có chắc muốn xóa người dùng " + object.taiKhoan + "?"
    );

    if (!confirm) return;
    try {
      await userService.fetchDeleteUserApi(object.taiKhoan);
      notification.success({
        message: "Xóa người dùng thành công",
        placement: "bottomRight",
      });

      const result = await userService.fetchUserListApi();
      setUserList(result.data.content);
    } catch (error) {
      notification.error({
        message: "Xóa người dùng thất bại",
      });
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      width: 200,
      sorter: (a, b) => {
        let hoTen1 = a.hoTen.toLowerCase().trim();
        let hoTen2 = b.hoTen.toLowerCase().trim();
        if (hoTen1 > hoTen2) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      render: (text, object) => <>{object.taiKhoan}</>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      render: (text, object) => <>{object.soDT}</>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, object) => <>{object.email}</>,
    },
    {
      title: "Quản trị",
      dataIndex: "maLoaiNguoiDung",
      width: 130,
      render: (text, object) => {
        if (object.maLoaiNguoiDung === "QuanTri") {
          return (
            <div className="btn-action">
              <FontAwesomeIcon className="check" icon={faCheck} />
            </div>
          );
        }
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "maLoaiNguoiDung",
      width: 130,
      render: (text, object) => {
        if (object.maLoaiNguoiDung === "KhachHang") {
          return (
            <div className="btn-action">
              <FontAwesomeIcon className="check" icon={faCheck} />
            </div>
          );
        }
      },
    },
    {
      title: "Thao tác",
      dataIndex: "taiKhoan",
      width: 150,
      render: (text, object) => (
        <div className="btn-action">
          <NavLink
            key={1}
            className="mb-1"
            to={`/admin/user/edit/${object.taiKhoan}`}
          >
            <button className="btn-icon text-info">
              <FontAwesomeIcon className="icon-size" icon={faPen} />
            </button>
          </NavLink>

          <button
            className="btn-icon text-danger"
            onClick={() => handleDeleteUser(object)}
          >
            <FontAwesomeIcon className="icon-size" icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleAdd = () => {
    navigate("/admin/user/addnew");
  };

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Danh sách người dùng</h3>
        <Button
          onClick={handleAdd}
          className="d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span style={{ fontSize: 16 }}>Thêm người dùng</span>
        </Button>
      </div>
      <Table
        rowKey={"maPhim"}
        columns={columns}
        dataSource={userList}
        onChange={onChange}
      />
    </Fragment>
  );
}
