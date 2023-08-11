import React, { useState } from "react";
import { Button, Descriptions, Radio, Space, Table } from "antd";
import { processarArquivo, filter } from "../teste";
import { FileExcelOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Código",
    dataIndex: "codigo",
    key: "codigo",
    width: "20px",
    sorter: {
      compare: (a, b) => a.codigo - b.codigo,
      multiple: 2,
    },
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
    key: "descricao",
    width: "200px",
  },
  {
    title: "Planejado",
    dataIndex: "planejado",
    key: "planejado",
    width: "20px",

    sorter: {
      compare: (a, b) => a.planejado - b.planejado,
      multiple: 2,
    },
  },
];

function ConversorDeADS() {
  const [unidade, setUnidade] = useState();
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [arquivo, setArquivo] = useState(null);

  const handleSelecionarArquivo = (event) => {
    setArquivo(event);
  };

  const handleArmazenarArquivo = () => {
    if (!arquivo || !unidade) {
      console.error("Selecione um arquivo e uma unidade antes de armazenar.");
      return;
    }

    processarArquivo(arquivo)
      .then((dados) => {
        const filtro = filter(dados, unidade);
        setDadosFiltrados(filtro);
      })
      .catch((erro) => {
        console.error("Erro ao processar o arquivo:", erro);
      });
  };

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Space
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "initial",
        }}
      >
        <Space>
          <Radio.Group
            onChange={(e) => setUnidade(e.target.value)}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Radio.Button value="SRV" key="srv">
              Serviços
            </Radio.Button>
            <Radio.Button value="PEÇ" key="pec">
              Material
            </Radio.Button>
          </Radio.Group>

          <Button disabled={!unidade} icon={<FileExcelOutlined />}>
            <label htmlFor="arquivo">Carregar ADS</label>
          </Button>
          <input
            id="arquivo"
            name="arquivo"
            type="file"
            accept=".xlsx"
            onChange={handleSelecionarArquivo}
            style={{
              display: "none",
              height: "50px",
              backgroundColor: "#fCfc",
              border: "none",
            }}
          />

          <Button
            type="primary"
            onClick={handleArmazenarArquivo}
            disabled={!arquivo}
          >
            Filtrar
          </Button>
        </Space>

        <Descriptions>
          <Descriptions.Item label="Valor">R$ 00.000,00</Descriptions.Item>
        </Descriptions>
      </Space>

      <Table
        size="small"
        columns={columns}
        dataSource={dadosFiltrados}
        rowKey={(record) => record.codigo}
        pagination={false}
        scroll={{
          y: 600,
        }}
      />
    </Space>
  );
}

export default ConversorDeADS;
