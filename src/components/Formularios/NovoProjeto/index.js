import React, { useState, useEffect } from "react";
import { Button, Form, Input, Space, notification, Table } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_PROJETO, GET_PROJETOS } from "../../../Schemas";
import { filter, processarArquivo } from "../../teste";
import NovoPonto from "../NovoPonto";

const columns = [
  {
    title: "Código",
    dataIndex: "codigo",
    key: "codigo",
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
    key: "descricao",
  },
  {
    title: "Planejado",
    dataIndex: "planejado",
    key: "planejado",
  },
];

function NovoProjeto({ onFinishProp }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Sucesso",
      description: "Obra cadastrada.",
    });
  };
  const [createPROJETO] = useMutation(CREATE_PROJETO);

  const [projeto, setProjeto] = useState("");
  const [cidade, setCidade] = useState("");
  const [contrato, setContrato] = useState("");
  const [local, setLocal] = useState("");
  const [csd, setCsd] = useState("");
  const [diagrama, setDiagrama] = useState("");
  const [fiscal, setFiscal] = useState("");
  const [tipo, setTipo] = useState("");

  const [arquivo, setArquivo] = useState(null);
  const [RDODigital, setDadosFiltrados] = useState([]);
  const handleSelecionarArquivo = (event) => {
    setArquivo(event);
  };
  useEffect(() => {
    if (arquivo) {
      processarArquivo(arquivo)
        .then((dados) => {
          console.log("Excel processado");
          const filtro = filter(dados, "SRV");
          console.log("Filtro aplicado");
          console.log(filtro);
          setDadosFiltrados(filtro);
        })
        .catch((erro) => {
          console.error("Erro ao processar o arquivo:", erro);
        });
    }
  }, [arquivo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "projeto":
        setProjeto(parseFloat(value));
        break;
      case "cidade":
        setCidade(value);
        break;
      case "contrato":
        setContrato(parseFloat(value));
        break;
      case "local":
        setLocal(value);
        break;
      case "csd":
        setCsd(value);
        break;
      case "diagrama":
        setDiagrama(parseInt(value));
        break;
      case "fiscal":
        setFiscal(value);
        break;
      case "tipo":
        setTipo(value);
        break;
      default:
        break;
    }
  };

  const onFinish = () => {
    console.log(
      projeto,
      cidade,
      contrato,
      local,
      csd,
      diagrama,
      fiscal,
      tipo,
      RDODigital
    );

    createPROJETO({
      variables: {
        projeto,
        cidade,
        contrato,
        local,
        csd,
        diagrama,
        fiscal,
        tipo,
        RDODigital
      },

      refetchQueries: [GET_PROJETOS],
    });

    openNotificationWithIcon("success");
    onFinishProp();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Space>
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Projeto"
          name="projeto"
          rules={[
            {
              required: true,
              message: "Obrigatorio.",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            type="number"
            name="projeto"
            value={projeto}
            placeholder="Projeto."
          />
        </Form.Item>
        <Form.Item
          label="Diagrama"
          name="diagrama"
          rules={[
            {
              required: true,
              message: "Obrigatorio.",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            type="number"
            name="diagrama"
            value={diagrama}
            placeholder="Diagrama ou Ordem."
          />
        </Form.Item>
        <Form.Item
          label="Contrato"
          name="contrato"
          rules={[
            {
              required: true,
              message: "Obrigatorio.",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            type="number"
            name="contrato"
            value={diagrama}
            placeholder="Contrato."
          />
        </Form.Item>
        <Form.Item
          label="Cidade"
          name="cidade"
          rules={[
            {
              required: true,
              message: "Obrigatorio.",
            },
          ]}
        >
          <Input onChange={handleInputChange} name="cidade" value={cidade} />
        </Form.Item>

        <Form.Item
          label="Local"
          name="local"
          rules={[
            {
              required: true,
              message: "Obrigatorio.",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            name="local"
            value={local}
            placeholder="Como vocês chamam a obra?"
          />
        </Form.Item>
        <Form.Item
          label="CSD"
          name="csd"
          rules={[
            {
              required: true,
              message: "Obrigatorio.",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            name="csd"
            value={csd}
            placeholder="CSD responsável pela obra?"
          />
        </Form.Item>
        <Form.Item
          label="Fiscal"
          name="fiscal"
          rules={[
            {
              required: true,
              message: "Obrigatorio.",
            },
          ]}
        >
          <Input onChange={handleInputChange} name="fiscal" value={fiscal} />
        </Form.Item>

        <Form.Item
          label="Tipo"
          name="tipo"
          rules={[
            {
              required: true,
              message: "Obrigatorio.",
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            name="tipo"
            value={tipo}
            placeholder="É ALM? Ponto de entrega?"
          />
        </Form.Item>

        <input type="file" accept=".xlsx" onChange={handleSelecionarArquivo} />
        <Table
          size="small"
          columns={columns}
          dataSource={RDODigital}
          rowKey={(record) => record.codigo}
        />
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>

      <NovoPonto />
    </Space>
  );
}

export default NovoProjeto;
