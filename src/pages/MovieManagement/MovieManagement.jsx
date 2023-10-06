import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table } from "antd";

import { movieService } from "../../services/movie";
import { formatDateAdmin } from "../../utils/date";

import "./movieManagement.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const { Search } = Input;

export default function MovieManagement() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const result = await movieService.fetchMovieListApi();

    setMovieList(result.data.content);
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: 150,
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
      dataIndex: "thaoTac",
      render: (text, object) => (
        <Fragment>
          <button className="btn btn-info mr-1">
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="btn btn-danger">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </Fragment>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const handleAdd = () => {
    navigate("/admin/films/addnew");
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>Quản lý phim</h3>
        <Button onClick={handleAdd}>Thêm phim</Button>
      </div>
      <Search
        className="py-3"
        placeholder="input search text"
        size="large"
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={movieList} onChange={onChange} />
    </div>
  );
}
