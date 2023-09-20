import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
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
							<a className="nav-link" href='#'>
								{" "}
								Contact{" "}
							</a>
						</li>
						<li className="nav-item active">
							<a className="nav-link" href='#'>
								{" "}
								News{" "}
							</a>
						</li>
						<li className="nav-item active">
							<a className="nav-link" href='#'>
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
					<div className="ml-auto">
                        <button className='btn btn-success' onClick={() => {return navigate("/login")}}>Login</button>
                        <button className='btn btn-info ml-3' onClick={() => navigate("/register")}>Register</button>
                    </div>
				</div>
			</nav>
		</div>
  );
}
