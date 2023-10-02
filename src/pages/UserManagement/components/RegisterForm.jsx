import React, { useState } from "react";
import { userService } from "../../../services/user";
import { validation } from "../../../validations/validation";
import { setUserInfoAction } from "../../../store/actions/userAction";
import { notification } from "antd";
import { useDispatch } from "react-redux";

export default function RegisterForm() {
  const [data, setData] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP1",
      maLoaiNguoiDung: "QuanTri",
      hoTen: "",
    },

    errors: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },

    valid: false,
  });

  const [_, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    let { name, value } = event.target;
    let errorMessage = "";

    let valid = true;
    for (let key in data.errors) {
      if (data.errors[key] !== "" || data.values[key] == "") {
        valid &= false;
      } else {
        valid &= true;
      }
    }

    if (validation.validateRequiredAdmin(value)) {
      errorMessage = "Dữ liệu không được để trống";
      valid &= false;
    } else {
      valid &= true;
    }

    if (name === "email") {
      let isValid = validation.validateWithRegexAdmin(
        value,
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );

      if (!isValid) {
        errorMessage = "Email không đúng định dạng";
        valid &= false;
      } else {
        valid &= true;
      }
    }

    if (name === "soDt") {
      let isValid = validation.validateWithRegexAdmin(
        value,
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      );

      if (!isValid) {
        errorMessage = "Số điện thoại không hợp lệ";
        valid &= false;
      } else {
        valid &= true;
      }
    }

    setData({
      ...data,
      values: {
        ...data.values,
        [name]: value,
      },
      errors: {
        ...data.errors,
        [name]: errorMessage,
      },
      valid,
    });

    console.log(data.values, data.valid);
  };

  const handleCreateUser = (event) => {
    event.preventDefault();

    if (data.valid) {
      const promise = userService.fetchCreateUserApi(data.values);

      promise.then((result) => {
        dispatch(setUserInfoAction(result.data.content));

        notification.success({
          message: "Tạo người dùng thành công",
          placement: "topLeft",
        });

        setMessage("Tạo người dùng thành công");
      });
      promise.catch((error) => {
        setMessage("Tạo người dùng thất bại", error);
      });
    }
  };

  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Create User
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form onSubmit={handleCreateUser}>
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  placeholder="Họ và tên"
                  className="form-control"
                  value={data.values.hoTen}
                  name="hoTen"
                  onChange={handleChange}
                />
                <p className="text-danger" name="hoTen">
                  {data.errors.hoTen}
                </p>
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  placeholder="Số điện thoại"
                  className="form-control"
                  value={data.values.soDt}
                  name="soDt"
                  onChange={handleChange}
                />
                <p className="text-danger" name="soDt">
                  {data.errors.soDt}
                </p>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  placeholder="Email"
                  className="form-control"
                  value={data.values.email}
                  name="email"
                  onChange={handleChange}
                />
                <p className="text-danger" name="email">
                  {data.errors.email}
                </p>
              </div>

              <div className="form-group">
                <label>Tài khoản</label>
                <input
                  placeholder="Tài khoản"
                  className="form-control"
                  value={data.values.taiKhoan}
                  name="taiKhoan"
                  onChange={handleChange}
                />
                <p className="text-danger" name="taiKhoan">
                  {data.errors.taiKhoan}
                </p>
              </div>

              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={data.values.matKhau}
                  name="matKhau"
                  onChange={handleChange}
                />
                <p className="text-danger" name="matKhau">
                  {data.errors.matKhau}
                </p>
              </div>

              <div className="form-group">
                <label>Loại người dùng</label>
                <select
                  className="form-control"
                  value={data.values.maLoaiNguoiDung}
                  name="maLoaiNguoiDung"
                  onChange={handleChange}
                >
                  <option value="QuanTri">Admin</option>
                  <option value="KhachHang">Customer</option>
                </select>
                <p className="text-danger" name="maLoaiNguoiDung">
                  {data.errors.maLoaiNguoiDung}
                </p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={handleCreateUser}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
