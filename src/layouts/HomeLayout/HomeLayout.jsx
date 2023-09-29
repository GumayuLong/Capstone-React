import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import CustomFooter from "../../components/CustomFooter/CustomFooter";

export default function HomeLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <CustomFooter />
    </div>
  );
}
