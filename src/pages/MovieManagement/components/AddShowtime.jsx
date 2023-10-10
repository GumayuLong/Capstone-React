import React, { useEffect, useState } from "react";
import {
  Select,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  notification,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { cinemaService } from "../../../services/cinema";
import { useParams } from "react-router-dom";
import { set } from "lodash";

export default function AddShowtime() {
  const params = useParams();
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      maPhim: params.movieId,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const result = await cinemaService.fetchCreateShowtime(values);

        setMessage(result.data.content);
        notification.success({
          message: "Thêm lịch chiếu thành công!",
          placement: "bottomRight",
        });
      } catch (error) {
        setMessage(error.respnse?.data);
        notification.error({
          message: "Thêm lịch chiếu thất bại!",
          placement: "bottomRight",
        });
      }
    },
  });

  const [state, setState] = useState({
    cinemaGroup: [],
    cinema: [],
  });

  useEffect(() => {
    fetchCinema();
  }, []);

  const fetchCinema = async () => {
    try {
      const result = await cinemaService.fetchCinemaApi();

      setState({
        ...state,
        cinemaGroup: result.data.content,
      });

      console.log(result.data.content);
    } catch (error) {}
  };

  const selectCinemaGroup = () => {
    return state.cinemaGroup?.map((element) => {
      return {
        label: element.tenHeThongRap,
        value: element.tenHeThongRap,
      };
    });
  };

  const handleChangeCinemaGroup = async (value) => {
    try {
      const result = await cinemaService.fetchCinemaListApi(value);

      setState({
        ...state,
        cinema: result.data.content,
      });
    } catch (error) {
      console.log("error", error.respnse?.data);
    }
  };

  const selectCinema = () => {
    return state.cinema?.map((element) => {
      return {
        label: element.tenCumRap,
        value: element.maCumRap,
      };
    });
  };

  const handleChangeCinema = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOK = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
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
      <h4>Thêm lịch chiếu phim</h4>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Hệ thống rạp">
            <Select
              options={selectCinemaGroup()}
              size="large"
              placeholder="Chọn hệ thống rạp"
              onChange={handleChangeCinemaGroup}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Cụm rạp">
            <Select
              options={selectCinema()}
              size="large"
              name="maRap"
              placeholder="Chọn cụm rạp"
              onChange={handleChangeCinema}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label="Ngày giờ chiếu">
            <DatePicker
              showTime
              name="ngayChieuGioChieu"
              format={"DD/MM/YYYY hh:mm:ss"}
              size="large"
              placeholder="Chọn ngày giờ chiếu"
              style={{ width: "100%" }}
              onChange={onChangDate}
              onOk={onOK}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label="Giá vé">
            <InputNumber
              name="giaVe"
              size="large"
              style={{ width: "100%" }}
              onChange={handleChangeInputNumber("giaVe")}
              min={75000}
              max={150000}
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Tạo lịch chiếu
        </button>
      </div>
    </Form>
  );
}
