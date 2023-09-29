import React from "react";

import { DesktopOutlined, UserOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";

import { Link, Outlet } from "react-router-dom";

import CustomFooter from "../../components/CustomFooter/CustomFooter";

const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout() {
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
            <Link to="/admin">Movie Management</Link>
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
        />
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
