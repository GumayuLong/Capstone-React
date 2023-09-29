import React, { useState } from "react";
import { userService } from "../../services/user";
import { validation } from "../../validations/validation";

export default function RegisterForm() {
  const [data, setData] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
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

  const handleChange = (event) => {
    let { name, value } = event.target;
    let errorMessage = "";

    if (validation.validateRequiredError(value)) {
      errorMessage = "Dữ liệu không được để trống";
    }

    if (name === "email") {
      let isValid = validation.validateWithRegex(
        value,
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );

      if (isValid) {
        errorMessage = "Email không đúng định dạng";
      }
    }

    setData(
      {
        ...data,
        values: {
          ...data.values,
          [name]: value,
        },
        errors: {
          ...data.errors,
          [name]: errorMessage,
        },
      },
      () => {
        let valid = true;
        for (let key in data.errors) {
          if (data.errors[key] !== "") {
            valid = false;
          }

          setData({
            ...data,
            valid,
          });

          if (valid) {
            userService.fetchCreateUserApi(data);
          }
        }
      }
    );

    console.log(data);
  };

  const handleCreateUser = (event) => {
    event.preventDefault();
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
                <label>Full name</label>
                <input
                  placeholder="Full name"
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
                <label>Phone number</label>
                <input
                  placeholder="Phone number"
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
                <label>Username</label>
                <input
                  placeholder="Username"
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
                <label>Password</label>
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
                <label>User group</label>
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
              Close
            </button>
            {data.valid ? (
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            ) : (
              <button disabled type="button" class="btn btn-primary">
                Save changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
