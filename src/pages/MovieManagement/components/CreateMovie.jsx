import React, { useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  notification,
} from "antd";

import { Col, Row } from "antd";
import moment from "moment";
import { useFormik } from "formik";
import { movieService } from "../../../services/movie";

import { useDispatch } from "react-redux";
import { createMovieAction } from "../../../store/actions/movieAction";
const { TextArea } = Input;

export default function CreateMovie() {
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      SapChieu: false,
      Hot: false,
      DangChieu: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      console.log({ values });
      values.maNhom = "GP01";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", formik.hinhAnh, values[key].name);
        }
      }
      console.log("hinhAnh", formData.get);
      // dispatch(createMovieAction(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    formik.setFieldValue("ngayKhoiChieu", moment(value).format("DD/MM/YYYY"));
    formik.setFieldError("ngayKhoiChieu", "Vui lòng chọn ngày khởi chiếu");
  };

  const handleChangeValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleUploadFile = (event) => {
    let file = event.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImg(e.target.result);
      };

      formik.setFieldValue("hinhAnh", file);
    }
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
          <Form.Item label="Mã phim">
            <Input size="large" name="maPhim" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tên phim">
            <Input size="large" name="tenPhim" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Link trailer">
            <Input size="large" name="trailer" onChange={formik.handleChange} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label="Ngày khởi chiếu">
            <DatePicker
              name="ngayKhoiChieu"
              format={"DD/MM/YYYY"}
              size="large"
              style={{ width: "100%" }}
              onChange={handleChangeDatePicker}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Sắp chiếu" valuePropName="checked">
            <Switch name="SapChieu" onChange={handleChangeValue("SapChieu")} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Đang chiếu" valuePropName="checked">
            <Switch
              name="DangChieu"
              onChange={handleChangeValue("DangChieu")}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Hot" valuePropName="checked">
            <Switch name="Hot" onChange={handleChangeValue("Hot")} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Số sao">
            <InputNumber
              name="danhGia"
              onChange={handleChangeValue("danhGia")}
              min={1}
              max={10}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Mô tả">
        <TextArea
          size="large"
          rows={6}
          name="moTa"
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <input type="file" onChange={handleUploadFile} />
        <img className="mt-2" src={img} width={200} alt="" />
      </Form.Item>

      <Form.Item>
        <button type="submit" className="btn btn-primary">
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
}
