import React from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import Booking from "../pages/Booking/Booking";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

export default function Router() {
	const routing = useRoutes([
		{
			path: "/",
			element: <HomeLayout />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/booking/:Id",
					element: <Booking />,
				},
				{
					path: "/movie-detail/:movieId",
					element: <MovieDetail />,
				},
				{
					path: "/login",
					element: <Login />,
				},
				{
					path: "/register",
					element: <Register />,
				},
			],
		},
		{
			path: "/admin",
			element: <AdminLayout />,
		},
	]);
	return routing;
}
