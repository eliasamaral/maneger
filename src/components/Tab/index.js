import React, { useContext } from "react";
import { Tabs } from "antd";

import Serviços from "../../Tabelas/Serviços";
import Materiais from "../../Tabelas/Materiais";
import Pendencias from "../../Tabelas/Pendencias";

function Tab() {
  const items = [
    {
      key: "1",
      label: `Serviços`,
      children: <Serviços />,
    },
    {
      key: "2",
      label: `Materiais`,
      children: <Materiais />,
    },
    {
      key: "3",
      label: `Pendências`,
      children: <Pendencias />,
    },
  ];

  return (
    <div>
      <Tabs type="card" size="small" items={items} />
    </div>
  );
}
export default Tab;
