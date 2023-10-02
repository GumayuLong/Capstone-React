import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Switch, Upload } from "antd";

import { Col, Row } from "antd";
import { validation } from "../../../validations/validation";
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function CreateMovie() {
  const [film, setFilm] = useState({
    values: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      SapChieu: true,
      Hot: true,
      DangChieu: true,
      danhGia: 10,
      hinhAnh: "",
      maNhom: "GP1",
    },

    errors: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      SapChieu: true,
      Hot: true,
      DangChieu: true,
      danhGia: 10,
      hinhAnh: "",
      maNhom: "",
    },

    valid: false,
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    let errorMessage = "";

    if (validation.validateRequiredAdmin(value)) {
      errorMessage = "Dữ liệu không được để trống";
    }

    setFilm({
      ...film,
      values: {
        ...film.values,
        [name]: value,
      },
      errors: {
        ...film.errors,
        [name]: errorMessage,
      },
    });
    console.log(film.values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Form
        onSubmitCapture={handleSubmit}
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
            <Form.Item label="Mã phim">
              <Input
                size="large"
                value={film.values.maPhim}
                name="maPhim"
                onChange={handleChange}
              />
              <p className="text-danger" name="maPhim">
                {film.errors.maPhim}
              </p>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Tên phim">
              <Input
                size="large"
                value={film.values.tenPhim}
                name="tenPhim"
                onChange={handleChange}
              />
              <p className="text-danger" name="tenPhim">
                {film.errors.tenPhim}
              </p>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item label="Link trailer">
              <Input
                size="large"
                value={film.values.trailer}
                name="trailer"
                onChange={handleChange}
              />
              <p className="text-danger" name="trailer">
                {film.errors.trailer}
              </p>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Form.Item label="Ngày khởi chiếu">
              <DatePicker
                size="large"
                style={{ width: "100%" }}
                value={film.values.ngayKhoiChieu}
                name="ngayKhoiChieu"
                onChange={handleChange}
              />
              <p className="text-danger" name="ngayKhoiChieu">
                {film.errors.ngayKhoiChieu}
              </p>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={6}>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
              <Switch
                value={film.values.SapChieu}
                name="SapChieu"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={6}>
            <Form.Item label="Đang chiếu" valuePropName="checked">
              <Switch
                value={film.values.DangChieu}
                name="DangChieu"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={6}>
            <Form.Item label="Hot" valuePropName="checked">
              <Switch
                value={film.values.Hot}
                name="Hot"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Mô tả">
          <TextArea
            size="large"
            rows={6}
            value={film.values.moTa}
            name="moTa"
            onChange={handleChange}
          />
          <p className="text-danger" name="moTa" onChange={handleChange}>
            {film.errors.moTa}
          </p>
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Lưu</button>
        </div>
      </Form>
    </>
  );
}
