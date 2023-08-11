import React, { useState } from "react";
import { Card, Typography, Input, Space } from "antd";
import { SwapOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Search } = Input;

const suffix = (
  <SwapOutlined
    style={{
      fontSize: "18px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  />
);

function realizarConversao(valor, fator) {
  const metrosParaKilos = valor / fator;
  const kilosParaMetros = valor * fator;

  return {
    metrosParaKilos,
    kilosParaMetros,
  };
}

function Conversao() {
  const [input, setInput] = useState();
  const [resultados, setResultados] = useState({});

  const onSearch = (value) => {
    setInput(value);
    const fator = 0.136;
    const conversao = realizarConversao(value, fator);
    setResultados(conversao);
  };

  return (
    <>
      <Card
        title="Conversão"
        style={{
          width: 300,
        }}
        actions={[
          <Typography>
            <Text>
              Kg:{" "}
              {resultados.kilosParaMetros
                ? resultados.kilosParaMetros.toFixed(3)
                : ""}
            </Text>
          </Typography>,
          <Typography>
            <Text>
              M:{" "}
              {resultados.metrosParaKilos
                ? resultados.metrosParaKilos.toFixed(3)
                : ""}
            </Text>
          </Typography>,
        ]}
      >
        <Space
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>
            <Text style={{ fontSize: "14px", fontWeight: "bold" }}>
              Cabo 2AWG CAA
            </Text>
            <Text
              style={{
                marginInline: "10px",
                fontSize: "12px",
                fontStyle: "italic",
              }}
            >
              Fator: {0.0552}
            </Text>
          </Typography>
          <Space>
            <Search
              type="number"
              onSearch={onSearch}
              style={{
                width: 150,
              }}
              enterButton={suffix}
            />
          </Space>
        </Space>
      </Card>
    </>
  );
}

export default Conversao;
