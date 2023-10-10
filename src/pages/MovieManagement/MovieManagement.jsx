import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input, Table, notification } from "antd";

import { movieService } from "../../services/movie";
import { formatDateAdmin } from "../../utils/date";

import "./movieManagement.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCheck,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function MovieManagement() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async (tenPhim = "") => {
    if (tenPhim.trim() !== "") {
      const result = await movieService.fetchSearchMovieApi(tenPhim);

      setMovieList(result.data.content);
    } else {
      const result = await movieService.fetchMovieListApi();

      setMovieList(result.data.content);
    }
  };

  const handleDeleteMovie = async (object) => {
    const confirm = window.confirm(
      "Bạn có chắc muốn xóa phim " + object.tenPhim + "?"
    );

    if (!confirm) return;
    try {
      await movieService.fetchMovieDeleteApi(object.maPhim);
      notification.success({
        message: "Xóa phim thành công",
        placement: "bottomRight",
      });

      const result = await movieService.fetchMovieListApi();
      setMovieList(result.data.content);
    } catch (error) {
      notification.error({
        message: "Xóa phim thất bại",
        placement: "bottomRight",
      });
    }
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: 120,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, object) => (
        <Fragment>
          <img src={object.hinhAnh} width={50} />
        </Fragment>
      ),
      width: 100,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhim1 = a.tenPhim.toLowerCase().trim();
        let tenPhim2 = b.tenPhim.toLowerCase().trim();
        if (tenPhim1 > tenPhim2) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: 300,
    },
    {
      title: "Hot",
      dataIndex: "hot",
      render: (text, object) => {
        if (object.hot) {
          return (
            <div className="btn-action">
              <FontAwesomeIcon className="check" icon={faCheck} />
            </div>
          );
        }
      },
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      render: (text, object) => <>{formatDateAdmin(object.ngayKhoiChieu)}</>,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      width: 550,
      render: (text, object) => (
        <Fragment>
          {object.moTa.length > 200
            ? object.moTa.substr(0, 200) + "..."
            : object.moTa}
        </Fragment>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "maPhim",
      width: 150,
      render: (text, object) => (
        <div className="btn-action">
          <NavLink
            key={1}
            className="mb-1"
            to={`/admin/films/edit/${object.maPhim}`}
          >
            <button className="btn-icon text-info">
              <FontAwesomeIcon className="icon-size" icon={faPen} />
            </button>
          </NavLink>

          <NavLink
            key={1}
            className="mb-1"
            to={`/admin/films/movie-schedule/${object.maPhim}`}
          >
            <button className="btn-icon text-warning">
              <FontAwesomeIcon className="icon-size" icon={faCalendar} />
            </button>
          </NavLink>

          <button
            className="btn-icon text-danger mb-1"
            onClick={() => handleDeleteMovie(object)}
          >
            <FontAwesomeIcon className="icon-size" icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    fetchMovieList(value);
  };

  const handleAdd = () => {
    navigate("/admin/films/addnew");
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <h3>Quản lý phim</h3>
        <Button
          onClick={handleAdd}
          className="d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span style={{ fontSize: 16 }}>Thêm phim</span>
        </Button>
      </div>
      <Search
        className="py-3"
        placeholder="Nhập tên phim..."
        size="large"
        enterButton={<SearchOutlined />}
        onSearch={onSearch}
      />
      <Table
        rowKey={"maPhim"}
        columns={columns}
        dataSource={movieList}
        onChange={onChange}
      />
    </Fragment>
  );
}
