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
import { useFormik } from "formik";
import { movieService } from "../../../services/movie";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const { TextArea } = Input;

export default function CreateMovie() {
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      hot: false,
      dangChieu: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: async (values) => {
      values.maNhom = "GP01";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      try {
        const result = await movieService.fetchMovieCreateApi(formData);
        console.log(result.data.content);
        notification.success({
          message: "Thêm phim thành công",
          placement: "bottomRight",
        });
        navigate("/admin/films");
      } catch (error) {
        console.log(error.response?.data);
        notification.error({
          message: "Thêm phim thất bại",
          placement: "bottomRight",
        });
      }
    },
  });

  const handleChangeDatePicker = (value) => {
    const ngayKhoiChieu = dayjs(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
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
      <h4>Thêm mới phim</h4>

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
            <Switch name="sapChieu" onChange={handleChangeValue("sapChieu")} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Đang chiếu" valuePropName="checked">
            <Switch
              name="dangChieu"
              onChange={handleChangeValue("dangChieu")}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Hot" valuePropName="checked">
            <Switch name="hot" onChange={handleChangeValue("hot")} />
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

      <Form.Item className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
}
