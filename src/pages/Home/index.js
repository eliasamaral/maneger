import React from "react";
import { Layout, theme } from "antd";

function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return <h1>Home</h1>
}

export default Home;
