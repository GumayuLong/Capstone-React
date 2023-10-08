import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input, Table, notification } from "antd";

import { movieService } from "../../services/movie";
import { formatDateAdmin } from "../../utils/date";

import "./movieManagement.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function MovieManagement() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const dispatch = useDispatch();

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
          return <FontAwesomeIcon className="check" icon={faCheck} />;
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
      render: (text, object) => (
        <Fragment>
          {object.moTa.length > 50
            ? object.moTa.substr(0, 50) + "..."
            : object.moTa}
        </Fragment>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "maPhim",
      width: 130,
      render: (text, object) => (
        <Fragment>
          <NavLink
            key={1}
            className="mr-1"
            to={`/admin/films/edit/${object.maPhim}`}
          >
            <button className="btn btn-info">
              <FontAwesomeIcon icon={faPen} />
            </button>
          </NavLink>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (
                window.confirm(
                  "Bạn có chắc muốn xóa phim " + object.tenPhim + "?"
                )
              ) {
                try {
                  const result = movieService.fetchMovieDeletApi(object.maPhim);
                  console.log(result.data.content);
                  notification.success({
                    message: "Xóa phim thành công",
                    placement: "bottomRight",
                  });

                  dispatch(movieService.fetchMovieListApi());
                } catch (error) {
                  console.log("error", error.response?.data);
                  notification.error({
                    message: "Xóa phim thất bại",
                    placement: "bottomRight",
                  });
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </Fragment>
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
    <div>
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
    </div>
  );
}
