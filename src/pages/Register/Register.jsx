/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";
import { setUserInfoAction } from "../../store/actions/userAction";
import { Button, notification, Space } from "antd";

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [state, setState] = useState({
		taiKhoan: "",
		matKhau: "",
		email: "",
		soDt: "",
		maNhom: "GP01",
		hoTen: "",
	});

	const handleChangeRegister = (event) => {
		// console.log(event);
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
		// console.log(state);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// console.log(state);
		const result = await userService.register(state);
		console.log(result);
		dispatch(setUserInfoAction(result.data.content));
		notification.success({
			message: "Register successfully",
			placement: "topLeft",
		});
		navigate("/login");
	};


	return (
		<div className="w-25 mx-auto py-5">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="">Account</label>
					<input
						onChange={handleChangeRegister}
						name="taiKhoan"
						type="text"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Password</label>
					<input
						onChange={handleChangeRegister}
						name="matKhau"
						type="password"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Confirm password</label>
					<input
						type="password"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Full name</label>
					<input
						onChange={handleChangeRegister}
						name="hoTen"
						type="text"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Email</label>
					<input
						onChange={handleChangeRegister}
						name="email"
						type="text"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Phone number</label>
					<input
						onChange={handleChangeRegister}
						name="soDt"
						type="text"
						className="form-control"
					/>
				</div>
				<button className="btn btn-success">REGISTER</button>
			</form>
		</div>
	);
}
