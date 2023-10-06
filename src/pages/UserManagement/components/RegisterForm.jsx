import React, { useEffect, useState } from "react";
import { userService } from "../../../services/user";
import { Col, Input, Row, Form, message, notification, Select } from "antd";
import { useFormik } from "formik";

export default function RegisterForm() {
  const [userType, setUserType] = useState([]);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    },

    onSubmit: (values) => {
      // values.maNhom = "GP01";
      // let data = new FormData();
      // for (let key in values) {
      //   data.append(key, values[key]);
      // }

      // try {
      //   const result = userService.fetchCreateUserApi(data);

      //   console.log(result.data.content);

      //   notification.success({
      //     message: "Thêm người dùng thành công",
      //     placement: "bottomRight",
      //   });
      // } catch (error) {
      //   console.log(error.response?.data);

      //   notification.error({
      //     message: "Thêm người dùng thất bại",
      //     placement: "bottomRight",
      //   });
      // }

      console.log(values);
    },
  });

  useEffect(() => {
    fetchUserTypeList();
  }, []);

  const fetchUserTypeList = async () => {
    const result = await userService.fetchUserTypeListApi();
    setUserType(result.data.content);
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
            <Input size="large" name="hoTen" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Email">
            <Input size="large" name="email" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Số điện thoại">
            <Input size="large" name="soDt" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tài khoản">
            <Input
              size="large"
              name="taiKhoan"
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Mật khẩu">
            <Input size="large" name="matKhau" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Loại người dùng">
            <Select
              labelInValue
              defaultValue={{
                value: "",
                label: "Chọn loại người dùng",
              }}
              size="large"
              name="maLoaiNguoiDung"
              onChange={formik.handleChange}
              options={userType.map((element) => {
                return [
                  {
                    value: element.maLoaiNguoiDung,
                    label: element.tenLoai,
                  },
                ];
              })}
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
