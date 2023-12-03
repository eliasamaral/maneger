import React from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Menu } from "antd";
import {
  ReconciliationOutlined,
  HomeOutlined,
  AreaChartOutlined,
  ToolOutlined,
  AuditOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function SideBar() {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider>
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
        items={[
          { label: "Home", key: "/", icon: <HomeOutlined /> },
          {
            label: "Projetos",
            key: "/projetos",
            icon: <ReconciliationOutlined />,
          },
          {
            label: "Relatorios de Obra",
            key: "/rdo",
            icon: <AreaChartOutlined />,
          },
          {
            label: "Ferramentas",
            icon: <ToolOutlined />,
            children: [
         
              {
                label: "Códigos",
                key: "/codigos",
              },
            ],
          },
          {
            label: "Contratos",
            key: "/contratos",
            icon:<AuditOutlined />,
          },
        ]}
      />
    </Sider>
  );
}
