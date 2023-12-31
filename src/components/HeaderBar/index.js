import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utility/context/authContext";

import { Layout, Button, Typography, Space, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

export default function HeaderBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const routeTitles = {
    "/": "Dashboard",
    "/projetos": "Carteira de obras",
    "/rdo": "Relatórios de Obra",
    "/ads": "ADS Digital",
    "/codigos": "Códigos",
    "/contratos": "Contratos",
  };

  const currentRoute = location.pathname;
  const currentPageTitle = routeTitles[currentRoute] || "Pagina não Encontrada";

  return (
    <Header
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 20px ",

        background: colorBgContainer,
      }}
    >
      <Space align="center">
        <Title style={{ margin: "0" }} level={5}>
          {currentPageTitle}
        </Title>
      </Space>
      <Space>
        <Button
          onClick={() => {
            onLogout();
          }}
          icon={<LogoutOutlined />}
        >
          Sair
        </Button>
      </Space>
    </Header>
  );
}
