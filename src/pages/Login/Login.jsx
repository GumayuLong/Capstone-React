import React, { createRef, useState } from "react";
import { userService } from "../../services/user";
import { useDispatch } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { validation } from "../../validations/validation";

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const accountInputRef = createRef();
	const passwordInputRef = createRef();

	const [state, setState] = useState({
		taiKhoan: "",
		matKhau: "",
	});

	const [posts, setPosts] = useState([]);
	const [errMessage, setErrMessage] = useState("");
	
	const handleChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let isValid = true;

		// CHECK VALIDATION ACCOUNT LOGIN
		isValid &=
			validation.validateRequired(
				state.taiKhoan,
				accountInputRef.current,
				"Vui lòng nhập tài khoản!"
			) 

		// CHECK VALIDATION PASSWORD ACCOUNT LOGIN
		isValid &=
			validation.validateRequired(
				state.matKhau,
				passwordInputRef.current,
				"Vui lòng nhập mật khẩu!"
			)
		if (isValid) {
				await userService.loginApi(state)
				.then((result) => {
					localStorage.setItem(
						"USER_INFO",
						JSON.stringify(result.data.content)
					);
					dispatch(setUserInfoAction(result.data.content));
					setErrMessage("")
					navigate("/");
				})
				.catch((err) => {
					setPosts(err.data);
					setErrMessage(err.response.data.content)
					
					passwordInputRef.current.innerHTML = errMessage;
				});
			
		}
	};

	return (
		<div className="w-25 mx-auto py-5">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="">Tài khoản</label>
					<input
						onChange={handleChange}
						name="taiKhoan"
						type="text"
						className="form-control"
					/>
					<p ref={accountInputRef} className="text-danger"></p>
				</div>
				<div className="form-group">
					<label htmlFor="">Mật khẩu</label>
					<input
						onChange={handleChange}
						name="matKhau"
						type="password"
						className="form-control"
					/>
					<p ref={passwordInputRef} className="text-danger">
						{errMessage}
					</p>
				</div>
				<button className="btn btn-primary">Đăng nhập</button>
			</form>
		</div>
	);
}
