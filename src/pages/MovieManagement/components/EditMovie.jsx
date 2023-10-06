import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
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

import { useDispatch } from "react-redux";
import { LoadingContext } from "../../../contexts/LoadingContext/LoadingContext";
import { movieService } from "../../../services/movie";
const { TextArea } = Input;

export default function EditMovie() {
  const [movieDetail, setMovieDetail] = useState({});
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const params = useParams();

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  const fetchMovieDetail = async () => {
    setLoadingState({ isLoading: true });
    const result = await movieService.fetchMovieDetailApi(params.movieId);

    setMovieDetail(result.data.content);
    console.log(result);
    setLoadingState({ isLoading: false });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenPhim: movieDetail?.tenPhim,
      trailer: movieDetail?.trailer,
      moTa: movieDetail?.moTa,
      ngayKhoiChieu: movieDetail?.ngayKhoiChieu,
      sapChieu: movieDetail.sapChieu,
      hot: movieDetail.hot,
      dangChieu: movieDetail.dangChieu,
      danhGia: movieDetail?.danhGia,
      hinhAnh: movieDetail?.hinhAnh,
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
      <h4>Chỉnh sửa phim</h4>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Mã phim">
            <Input
              size="large"
              name="maPhim"
              onChange={formik.handleChange}
              value={movieDetail.maPhim}
              disabled
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tên phim">
            <Input
              size="large"
              name="tenPhim"
              value={formik.values.tenPhim}
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Link trailer">
            <Input
              size="large"
              name="trailer"
              value={formik.values.trailer}
              onChange={formik.handleChange}
            />
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
              // value={formik.values.ngayKhoiChieu}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Sắp chiếu" valuePropName="checked">
            <Switch
              name="sapChieu"
              checked={formik.values.sapChieu}
              onChange={handleChangeValue("sapChieu")}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Đang chiếu" valuePropName="checked">
            <Switch
              name="dangChieu"
              checked={formik.values.dangChieu}
              onChange={handleChangeValue("dangChieu")}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Hot" valuePropName="checked">
            <Switch
              name="hot"
              checked={formik.values.hot}
              onChange={handleChangeValue("hot")}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="Số sao">
            <InputNumber
              name="danhGia"
              value={formik.values.danhGia}
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
          value={formik.values.moTa}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <input type="file" onChange={handleUploadFile} />
        <img
          className="mt-2"
          src={img === "" ? movieDetail.hinhAnh : img}
          width={200}
          alt=""
        />
      </Form.Item>

      <Form.Item>
        <button type="submit" className="btn btn-primary">
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
}
