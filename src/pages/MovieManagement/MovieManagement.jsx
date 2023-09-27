import React, { useEffect, useState } from "react";
import { movieService } from "../../services/movie";

import "./movieManagement.scss";
import { formatDateAdmin } from "../../utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function MovieManagement() {
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
              <FontAwesomeIcon className="hot" icon={faCheck} />
            ) : (
              <FontAwesomeIcon className="not-hot" icon={faXmark} />
            )}
          </td>
          <td>{formatDateAdmin(element.ngayKhoiChieu)}</td>
          <td align="center">
            <button className="btn btn-info mr-2">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <table className="table mt-2" style={{ fontSize: 18 }}>
      <thead className="bg-light p-2 text-center">
        <tr>
          <th>No.</th>
          <th>Poster</th>
          <th>Movie ID</th>
          <th>Movie Name</th>
          <th>Hot</th>
          <th>Start Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{renderMovieList()}</tbody>
    </table>
  );
}
