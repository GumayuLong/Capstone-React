import React, { useContext, useEffect, useState } from "react";
import { Col, Input, Row, Form, notification, Select } from "antd";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingContext } from "../../../contexts/LoadingContext/LoadingContext";
import { userService } from "../../../services/user";

export default function EditUser() {
  const [userDetail, setUserDetail] = useState({});
  const [userType, setUserType] = useState([]);
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const params = useParams();

  useEffect(() => {
    fetchUserDetail();
    fetchUserTypeList();
  }, []);

  const fetchUserDetail = async () => {
    setLoadingState({ isLoading: true });
    console.log(params);
    const result = await userService.fetchUserDetailApi(params.taiKhoan);

    setUserDetail(result.data.content);
    console.log(result);
    setLoadingState({ isLoading: false });
  };

  const fetchUserTypeList = async () => {
    try {
      const result = await userService.fetchUserTypeListApi();
      setUserType(result.data.content);
    } catch (error) {
      console.log("Error", error.response?.data);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userDetail.taiKhoan,
      matKhau: userDetail.matKhau,
      email: userDetail.email,
      soDT: userDetail.soDT,
      maNhom: "GP01",
      maLoaiNguoiDung: userDetail.maLoaiNguoiDung,
      hoTen: userDetail.hoTen,
    },

    onSubmit: async (values) => {
      try {
        await userService.fetchUpdateUserApi(values);
        notification.success({
          message: "Cập nhật người dùng thành công",
          placement: "bottomRight",
        });

        await userService.fetchUserListApi();
        navigate("/admin/user");
      } catch (error) {
        console.log(error.response?.data);
        notification.error({
          message: "Cập nhật người dùng thất bại",
          placement: "bottomRight",
        });
      }
    },
  });

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
              value={formik.values.hoTen}
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
              value={formik.values.email}
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
              value={formik.values.soDT}
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
              value={formik.values.taiKhoan}
              onChange={formik.handleChange}
              placeholder="Tài khoản"
              disabled
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Mật khẩu">
            <Input.Password
              size="large"
              name="matKhau"
              value={formik.values.matKhau}
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
              value={formik.values.maLoaiNguoiDung}
              onChange={handleChangeUserType}
              options={selectUserType()}
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Câp nhật
        </button>
      </div>
    </Form>
  );
}
