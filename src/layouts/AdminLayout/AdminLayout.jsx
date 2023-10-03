import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomFooter from "../../components/CustomFooter/CustomFooter";
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
        <div className="d-flex align-item-center justify-content-end mx-3">
          <span className="text-white">Hello {userState.userInfo.hoTen}</span>
          <button onClick={handleLogout} className="ml-3 btn btn-login">
            LOGOUT
          </button>
          <button onClick={handleBack} className="ml-3 btn btn-icon">
            <FontAwesomeIcon icon={faRightToBracket} className="text-white" />
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
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <div className="demo-logo-vertical" />

        <Menu mode="inline" theme="dark" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            <Link to="/admin/films">Movie Management</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/user">User Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#343a40",
          }}
        >
          {renderContent()}
        </Header>
        <Content style={{ padding: "10px 20px" }}>
          <Outlet />
        </Content>
        <Footer
          style={{
            padding: 0,
          }}
        >
          <CustomFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}
