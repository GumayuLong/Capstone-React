import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserInfoAction } from "../../store/actions/userAction";

export default function Header() {
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.userReducer);
	const navigate = useNavigate();
	const renderContent = () => {
		// CHƯA ĐĂNG NHẬP USER INFO = NULL
		if (!userState.userInfo) {
			return (
				<>
					<button
						onClick={() => navigate("/login")}
						className="btn btn-outline-info my-2 my-sm-0 mr-2"
						>
						Sign in
					</button>
					<button
						onClick={() => navigate("/register")}
						className="btn btn-outline-success my-2 my-sm-0"
						type="sumit"
					>
						Sign up
					</button>
				</>
			);
		}

		// ĐÃ ĐĂNG NHẬP
		else {
			return (
				<>
					<span>Hello {userState.userInfo.hoTen}</span>
					<button
						onClick={handleLogout}
						className=" ml-3 btn btn-danger"
					>
						LOGOUT
					</button>
				</>
			);
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
			<nav className="navbar navbar-expand-sm navbar-light bg-light">
				<a className="navbar-brand" href="#">
					{" "}
					Movie{" "}
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
						<li className="nav-item active">
							<NavLink className="nav-link" to="/">
								{" "}
								Home{" "}
							</NavLink>
						</li>
						<li className="nav-item active">
							<a className="nav-link" href="#">
								{" "}
								Contact{" "}
							</a>
						</li>
						<li className="nav-item active">
							<a className="nav-link" href="#">
								{" "}
								News{" "}
							</a>
						</li>
						<li className="nav-item active">
							<a className="nav-link" href="#">
								{" "}
								Apps{" "}
							</a>
						</li>
						{/* <li className="nav-item active">
							<NavLink className="nav-link" to="/booking">
								{" "}
								Booking{" "}
							</NavLink>
						</li> */}
					</ul>
					<div className="ml-auto">{renderContent()}</div>
				</div>
			</nav>
		</div>
	);
}
