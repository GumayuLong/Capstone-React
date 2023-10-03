import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserInfoAction } from "../../store/actions/userAction";
import "./header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const renderContent = () => {
    if (!userState.userInfo) {
      return (
        <>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-login my-2 my-sm-0 mr-2"
          >
            SIGN IN
          </button>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-register my-2 my-sm-0"
            type="submit"
          >
            REGISTER
          </button>
        </>
      );
    }

    // ĐÃ ĐĂNG NHẬP
    else if (userState.userInfo) {
		return (
			<>
				<span className="text-white">
					Hello {userState.userInfo.hoTen}
				</span>
				<button onClick={handleLogout} className=" ml-3 btn btn-login">
					LOGOUT
				</button>
			</>
		);

    // else if ()
	}
  };

  const renderMenuAdmin = () => {
    if (userState.userInfo) {
      if (userState.userInfo.maLoaiNguoiDung === "QuanTri") {
        return (
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/films">
              Admin
            </NavLink>
          </li>
        );
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  return (
    <div>
      {/* Header */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark header">
        <a className="navbar-brand" href="#">
          <h3>Cyber Cinema</h3>
        </a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                News
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Apps
              </a>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/booking">
                Booking
              </NavLink>
            </li> */}

            {renderMenuAdmin()}
          </ul>
          <div className="ml-auto">{renderContent()}</div>
        </div>
      </nav>
    </div>
  );
}
