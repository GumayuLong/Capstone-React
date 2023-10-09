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
import MovieSelection from "../pages/MovieSelection/MovieSelection";
import RegisterForm from "../pages/UserManagement/components/RegisterForm";
import EditMovie from "../pages/MovieManagement/components/EditMovie";
import AddShowtime from "../pages/MovieManagement/components/AddShowtime";

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
          path: "/movie-selection",
          element: <MovieSelection />,
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
          index: true,
        },
        {
          children: [
            {
              path: "/admin/films",
              element: <MovieManagement />,
            },
            {
              path: "/admin/films/addnew",
              element: <CreateMovie />,
            },
            {
              path: "/admin/films/edit/:movieId",
              element: <EditMovie />,
            },
            {
              path: "/admin/films/movie-schedule/:movieId",
              element: <AddShowtime />,
            },
            {
              path: "/admin/user",
              element: <UserManagement />,
            },
            {
              path: "/admin/user/addnew",
              element: <RegisterForm />,
            },
          ],
        },
      ],
    },
  ]);
  return routing;
}
