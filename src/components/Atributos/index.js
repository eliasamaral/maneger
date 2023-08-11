import React from "react";
import { Space, Typography } from "antd";

const { Text } = Typography;

function atributoItem(title, value) {
  return (
    <div
      style={{
        width: "130px",
        marginBottom: "20px",
      }}
    >
      <Typography>
        <Text style={{ fontSize: "16px", fontWeight: 600 }}>{title}</Text>
      </Typography>
      <Typography>
        <Text style={{ fontSize: "14px" }}>{value}</Text>
      </Typography>
    </div>
  );
}

function Atributos(props) {
  const { data } = props;

  return (
    <>
      <Space
        style={{
          flexWrap: "wrap",
          maxWidth: "630px",
          height: "fit-content",
        }}
      >
        {atributoItem("Projeto", data.projeto)}
        {atributoItem("Diagrama", data.diagrama)}
        {atributoItem("Local", data.local)}
        {atributoItem("Cidade", data.cidade)}
        {atributoItem("CSD", data.csd)}
        {atributoItem("Fiscal", data.fiscal)}
        {atributoItem("Tipo", data.tipo)}
        {atributoItem("Contrato", data.contrato)}
      </Space>
    </>
  );
}

export default Atributos;
