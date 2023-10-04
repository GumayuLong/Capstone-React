import React, { useEffect, useState } from "react";
import { userService } from "../../../services/user";
import { validation } from "../../../validations/validation";
import { setUserInfoAction } from "../../../store/actions/userAction";
import { message, notification } from "antd";
import { useDispatch } from "react-redux";

export default function RegisterForm() {
  const [data, setData] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
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
  const [userType, setUserType] = useState([]);

  useEffect(() => {
    fetchUserTypeList();
  }, []);

  const fetchUserTypeList = async () => {
    const result = await userService.fetchUserTypeListApi();
    setUserType(result.data.content);
  };

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    let { name, value } = event.target;
    let errorMessage = "";

    if (validation.validateRequiredAdmin(value)) {
      errorMessage = "Dữ liệu không được để trống";
    }

    if (name === "email") {
      let isValid = validation.validateWithRegexAdmin(
        value,
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );

      if (!isValid) {
        errorMessage = "Email không đúng định dạng";
      }
    }

    if (name === "soDt") {
      let isValid = validation.validateWithRegexAdmin(
        value,
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      );

      if (!isValid) {
        errorMessage = "Số điện thoại không hợp lệ";
      }
    }

    if (name === "maLoaiNguoiDung" && name.seletedIndex === 0) {
      errorMessage = "Vui lòng chọn loại người dùng";
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
        checkValid();
      }
    );

    console.log(data.valid);
  };

  const checkValid = () => {
    let valid = true;
    for (let key in data.errors) {
      if (data.errors[key] !== "" || data.values[key] == "") {
        valid = false;
      } else {
        valid = true;
      }
    }

    setData({
      ...data,
      valid,
    });
  };

  const handleCreateUser = (event) => {
    event.preventDefault();

    if (data.valid) {
      const promise = userService.fetchCreateUserApi(data.values);

      promise.then((result) => {
        dispatch(setUserInfoAction(result.data.content));

        setMessage("Tạo người dùng thành công");

        notification.success({
          message: message,
          placement: "bottomRight",
        });
      });
      promise.catch((error) => {
        setMessage("Tạo người dùng thất bại");

        notification.success({
          message: message,
          placement: "bottomRight",
        });
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="createUser"
      tabIndex={-1}
      aria-labelledby="createUser"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createUser">
              Thêm thông tin người dùng
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleCreateUser}>
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
                <label>Loại người dùng</label>
                <select
                  className="form-control"
                  value={data.values.maLoaiNguoiDung}
                  name="maLoaiNguoiDung"
                  onChange={handleChange}
                >
                  <option value="">Chọn người dùng</option>
                  {userType.map((element) => (
                    <option value={element.maLoaiNguoiDung}>
                      {element.tenLoai}
                    </option>
                  ))}
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
            {data.valid ? (
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleCreateUser}
              >
                Lưu
              </button>
            ) : (
              <button type="button" class="btn btn-primary" disabled>
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
