import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";

import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

// import "../../components/Header/header.scss";
import "./adminLayout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  const renderContent = () => {
    if (userState.userInfo) {
      return (
        <div
          className="d-flex align-items-center justify-content-end"
          style={{ borderBottom: "1px solid #343a40", height: 50 }}
        >
          <span className="text-dark">Hello {userState.userInfo.hoTen}</span>
          <button onClick={handleLogout} className="ml-3 btn btn-login">
            LOGOUT
          </button>
          <button onClick={handleBack} className="mx-3 btn btn-icon">
            <FontAwesomeIcon icon={faRightToBracket} className="text-dark" />
          </button>
        </div>
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Layout style={{ overflow: "hidden" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
        style={{ height: "100vh" }}
      >
        <div className="demo-logo-vertical">
          <a
            className="navbar-brand text-white p-3 m-0 d-flex justify-content-center"
            href="#"
          >
            <h3>Cyber Cinema</h3>
          </a>
        </div>

        <Menu mode="inline" theme="dark" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            <Link to="/admin/films">Danh sách phim</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/user">Người dùng</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            padding: 0,
            background: "#F5F5F5",
          }}
        >
          {renderContent()}
        </Header>
        <Content style={{ padding: "10px 20px", overflowY: "scroll" }}>
          <Outlet />
        </Content>
        <Footer
          style={{
            padding: 0,
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
}
