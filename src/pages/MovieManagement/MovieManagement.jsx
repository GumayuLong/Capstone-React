import React, { Fragment, useEffect, useState } from "react";
import { movieService } from "../../services/movie";

import "./movieManagement.scss";
import { formatDateAdmin } from "../../utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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

  const renderMovieList = () => {
    return movieList.map((element, index) => {
      return (
        <tr key={element.maPhim}>
          <td width={100} align="center">
            {index + 1}
          </td>
          <td width={100} align="center">
            <img width={50} src={element.hinhAnh} alt="" />
          </td>
          <td width={300} align="center">
            {element.maPhim}
          </td>
          <td>{element.tenPhim}</td>
          <td width={150} align="center">
            {element.hot ? (
              <FontAwesomeIcon className="check" icon={faCheck} />
            ) : (
              <FontAwesomeIcon className="uncheck" icon={faXmark} />
            )}
          </td>
          <td>{formatDateAdmin(element.ngayKhoiChieu)}</td>
          <td align="center">
            <button className="btn btn-info mr-2">
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="btn btn-danger">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      );
    });
  };

  const handleAdd = () => {
    navigate("/admin/films/addnew");
  };

  return (
    <Fragment>
      <div className="d-flex align-item-center justify-content-end">
        <button className="btn btn-success" onClick={handleAdd}>
          <FontAwesomeIcon className="pr-2" icon={faPlus} />
          Thêm phim
        </button>
      </div>

      <table className="table mt-2" style={{ fontSize: 18 }}>
        <thead className="bg-light p-2 text-center">
          <tr>
            <th>STT</th>
            <th>Hình ảnh</th>
            <th>Mã phim</th>
            <th>Tên phim</th>
            <th>Hot</th>
            <th>Ngày khởi chiếu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>{renderMovieList()}</tbody>
      </table>
    </Fragment>
  );
}
