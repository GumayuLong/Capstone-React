import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";
import { setUserInfoAction } from "../../store/actions/userAction";
import { notification } from "antd";
import { validation } from "../../validations/validation";

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const usernameInputRef = createRef();
	const fullNameInputRef = createRef();
	const passwordInputRef = createRef();
	const confirmPasswordInputRef = createRef();
	const emailInputRef = createRef();
	const phoneNumberInputRef = createRef();

	const [state, setState] = useState({
		taiKhoan: "",
		matKhau: "",
		email: "",
		soDt: "",
		maNhom: "GP01",
		hoTen: "",
	});

	const [confirmPassword, setConfirmPassword] = useState("");
	const [errMessage, setErrMessage] = useState("");

	// Handle change event
	const handleChangeRegister = (event) => {

		setState({
			...state,
			[event.target.name]: event.target.value,
		});

	};

	const handleChangeConfirmPassword = (event) => {

		setConfirmPassword({
			...confirmPassword,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let isValid = true;

		// CHECK VALIDATION USERNAME
		isValid &=
			validation.validateRequired(
				state.taiKhoan,
				usernameInputRef.current,
				"Please enter your account !"
			) 

		// CHECK VALIDATION PASSWORD
		isValid &= validation.validateRequired(
			state.matKhau,
			passwordInputRef.current,
			"Please enter your password !"
		);

		// CHECK VALIDATION CONFIRM PASSWORD
		isValid &=
			validation.validateRequired(
				confirmPassword,
				confirmPasswordInputRef.current,
				"Please confirm your password again !"
			) 
			&&
			validation.validateConfirmPassword(
				state.matKhau,
				confirmPassword.confirmPassword,
				confirmPasswordInputRef.current,
				"Please re-enter the correct password !"
			);

		// CHECK VALIDATION FULL NAME
		isValid &=
			validation.validateRequired(
				state.hoTen,
				fullNameInputRef.current,
				"Please enter your full name !"
			) &&
			validation.validateFullName(
				state.hoTen,
				fullNameInputRef.current,
				"Please enter your first and last name in letters !"
			);

		// CHECK VALIDATION EMAIL
		isValid &=
			validation.validateRequired(
				state.email,
				emailInputRef.current,
				"Please enter your email !"
			) &&
			validation.validateEmail(
				state.email,
				emailInputRef.current,
				"Please enter the correct email format !"
			) 

		// CHECK VALIDATION PHONE NUMBER
		isValid &=
			validation.validateRequired(
				state.soDt,
				phoneNumberInputRef.current,
				"Please enter your phone number !"
			) &&
			validation.validatePhoneNumber(
				state.soDt,
				phoneNumberInputRef.current,
				"Please enter the phone number as numeric characters !"
			);

		if (isValid) {
			await userService.register(state).then((result) => {
				dispatch(setUserInfoAction(result.data.content));
				// console.log(result.data.content.email)
				notification.success({
					message: "Register successfully",
					placement: "topLeft",
				});
				setErrMessage("");
				navigate("/login");
			}).catch((err) => {
				setErrMessage(err.response.data.content);
				phoneNumberInputRef.current.innerHTML = errMessage;
			});		
		}
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
					<p ref={usernameInputRef} className="text-danger"></p>
				</div>
				<div className="form-group">
					<label htmlFor="">Password</label>
					<input
						onChange={handleChangeRegister}
						name="matKhau"
						type="password"
						className="form-control"
					/>
					<p ref={passwordInputRef} className="text-danger"></p>
				</div>
				<div className="form-group">
					<label htmlFor="">Confirm password</label>
					<input
						onChange={handleChangeConfirmPassword}
						id="confirmPassword"
						type="password"
						className="form-control"
						name="confirmPassword"
					/>
					<p
						ref={confirmPasswordInputRef}
						className="text-danger"
					></p>
				</div>
				<div className="form-group">
					<label htmlFor="">Full name</label>
					<input
						onChange={handleChangeRegister}
						name="hoTen"
						type="text"
						className="form-control"
					/>
					<p ref={fullNameInputRef} className="text-danger"></p>
				</div>
				<div className="form-group">
					<label htmlFor="">Email</label>
					<input
						onChange={handleChangeRegister}
						name="email"
						type="text"
						className="form-control"
					/>
					<p ref={emailInputRef} className="text-danger"></p>
				</div>
				<div className="form-group">
					<label htmlFor="">Phone number</label>
					<input
						onChange={handleChangeRegister}
						name="soDt"
						type="text"
						className="form-control"
					/>
					<p ref={phoneNumberInputRef} className="text-danger">{errMessage}</p>
				</div>
				<button className="btn btn-success">REGISTER</button>
			</form>
		</div>
	);
}
