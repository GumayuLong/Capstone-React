import React, { useEffect, useState } from "react";
import { userService } from "../../../services/user";
import { Col, Input, Row, Form, message, notification, Select } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [userType, setUserType] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    },

    onSubmit: async (values) => {
      try {
        const result = await userService.fetchCreateUserApi(values);

        console.log(result.data.content);

        notification.success({
          message: "Thêm người dùng thành công",
          placement: "bottomRight",
        });

        navigate("/admin/user");
      } catch (error) {
        console.log(error.response?.data);

        notification.error({
          message: "Thêm người dùng thất bại",
          placement: "bottomRight",
        });
      }

      console.log(values);
    },
  });

  useEffect(() => {
    fetchUserTypeList();
  }, []);

  const fetchUserTypeList = async () => {
    try {
      const result = await userService.fetchUserTypeListApi();
      setUserType(result.data.content);
    } catch (error) {
      console.log("Error", error.response?.data);
    }
  };

  const selectUserType = () => {
    return userType?.map((element) => {
      return {
        label: element.tenLoai,
        value: element.maLoaiNguoiDung,
      };
    });
  };

  const handleChangeUserType = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
    console.log(value);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 100,
      }}
      layout="vertical"
      style={{
        maxWidth: 1000,
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Họ và tên">
            <Input
              size="large"
              name="hoTen"
              onChange={formik.handleChange}
              placeholder="Họ và tên"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Email">
            <Input
              size="large"
              name="email"
              onChange={formik.handleChange}
              placeholder="Email"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Số điện thoại">
            <Input
              size="large"
              name="soDT"
              onChange={formik.handleChange}
              placeholder="Số điện thoại"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tài khoản">
            <Input
              size="large"
              name="taiKhoan"
              onChange={formik.handleChange}
              placeholder="Tài khoản"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Mật khẩu">
            <Input.Password
              size="large"
              name="matKhau"
              onChange={formik.handleChange}
              placeholder="Mật khẩu"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Loại người dùng">
            <Select
              size="large"
              placeholder="Chọn loại người dùng"
              name="maLoaiNguoiDung"
              onChange={handleChangeUserType}
              options={selectUserType()}
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Thêm người dùng
        </button>
      </div>
    </Form>
  );
}
