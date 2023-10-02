import React from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import Booking from "../pages/Booking/Booking";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import NoAuthGuard from "../guards/NoAuthGuard";
import AuthGuard from "../guards/AuthGuard";
import MovieManagement from "../pages/MovieManagement/MovieManagement";
import UserManagement from "../pages/UserManagement/UserManagement";
import CreateMovie from "../pages/MovieManagement/components/CreateMovie";

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
          element: (
            <AuthGuard>
              <Booking />
            </AuthGuard>
          ),
        },
        {
          path: "/movie-detail/:movieId",
          element: <MovieDetail />,
        },
        {
          path: "/login",
          element: (
            <NoAuthGuard>
              <Login />
            </NoAuthGuard>
          ),
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },

    {
      path: "/admin",
      element: (
        <AuthGuard>
          <AdminLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "/admin/films",
          element: <MovieManagement />,
          // children: [
          //   {
          //     path: "/admin/films/addnew",
          //     element: <CreateMovie />,
          //   },
          // ],
        },

        {
          path: "/admin/addnew",
          element: <CreateMovie />,
        },
        {
          path: "/admin/user",
          element: <UserManagement />,
        },
      ],
    },
  ]);
  return routing;
}
