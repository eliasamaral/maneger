import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";

import HeaderBar from "../HeaderBar";
import SideBar from "../SideBar";

const { Content } = Layout;

function Tamplate() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SideBar />

      <Layout>
        <HeaderBar />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Tamplate;
