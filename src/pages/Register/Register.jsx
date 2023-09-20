import React from 'react'

export default function Register() {
  return (
		<div className="w-25 mx-auto py-5">
			<form>
				<div className="form-group">
					<label htmlFor="">Account</label>
					<input
						name="taiKhoan"
						type="text"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Password</label>
					<input
						name="matKhau"
						type="password"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Confirm password</label>
					<input
						name="confirmMatKhau"
						type="password"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Full name</label>
					<input
						name="fullName"
						type="text"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="">Email</label>
					<input name="email" type="email" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="">Phone number</label>
					<input
						name="phoneNumber"
						type="text"
						className="form-control"
					/>
				</div>
				<button className="btn btn-success">REGISTER</button>
			</form>
		</div>
  );
}
