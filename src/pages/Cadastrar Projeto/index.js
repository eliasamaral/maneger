import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Descriptions, Radio, Space, Table, Divider } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";

import { processarArquivo, filter } from "../../utility/process_ads_data";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_PROJETO, GET_PROJETOS, GET_CONTRATOS } from "../../Schemas";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  fontSize: "12px",
  padding: "10px 8px",
  borderRadius: "7px",
  border: "1px solid rgb(177 177 177)",
  outline: "none",
  width: "200px",
  marginBottom: "10px",
};

const spanStyle = {
  display: "flex",
  height: "50px",
  flexDirection: "column",
};

const columns = [
  {
    title: "Código",
    dataIndex: "codigo",
    key: "codigo",
    sorter: {
      compare: (a, b) => a.codigo - b.codigo,
      multiple: 2,
    },
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

    sorter: {
      compare: (a, b) => a.planejado - b.planejado,
      multiple: 2,
    },
  },
];

const Schema = z.object({
  projeto: z.coerce.number(),
  diagrama: z.coerce.number(),
  contrato: z.coerce.number(),
  cidade: z
    .string()
    .nonempty("Item obrigatório.")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  local: z
    .string()
    .nonempty("Item obrigatório.")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),

  tipo: z
    .string()
    .nonempty("Item obrigatório.")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),

    coord : z.object({
      x: z.string(),
      y: z.string(),
    }),

  // x: z.string().nonempty("Item obrigatório."),
  // y: z.string().nonempty("Item obrigatório."),
});

function CreateProject() {
  const navigate = useNavigate();
  const [createProjeto, { loading, error }] = useMutation(CREATE_PROJETO);
  const { data: dataContratos, loading: loadingContratos } =
    useQuery(GET_CONTRATOS);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const handleFormSubmit = async (e) => {
    try {
      const data = { ...e, RDODigital: dadosFiltrados };

      await createProjeto({
        variables: data,
        refetchQueries: [GET_PROJETOS],
      });

      console.log(data);

      navigate("/projetos");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

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

  if (loading || loadingContratos) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const { contratos } = dataContratos;

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "initial",
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Space wrap>
          <span style={spanStyle}>
            <input
              {...register("projeto")}
              type="number"
              placeholder="Projeto"
              style={inputStyle}
            />
            {errors.projeto && <span>{errors.projeto.message}</span>}
          </span>

          <span style={spanStyle}>
            <input
              {...register("diagrama")}
              type="number"
              placeholder="Diagrama ou Ordem"
              style={inputStyle}
            />
            {errors.diagrama && <span>{errors.diagrama.message}</span>}
          </span>

          <span style={spanStyle}>
            <select {...register("contrato")} style={inputStyle}>
              {contratos.map((contrato, index) => (
                <option key={index} value={contrato.numero}>
                  {contrato.numero}
                </option>
              ))}
            </select>
            {errors.contrato && <span>{errors.contrato.message}</span>}
          </span>

          <span style={spanStyle}>
            <input
              {...register("cidade")}
              type="text"
              placeholder="Cidade"
              style={inputStyle}
            />
            {errors.cidade && <span>{errors.cidade.message}</span>}
          </span>

          <span style={spanStyle}>
            <input
              {...register("local")}
              type="text"
              placeholder="Local"
              style={inputStyle}
            />
            {errors.local && <span>{errors.local.message}</span>}
          </span>

          <span style={spanStyle}>
            <input
              {...register("tipo")}
              status={errors.tipo ? "error" : "success"}
              type="text"
              placeholder="Tipo"
              style={inputStyle}
            />
            {errors.tipo && <span>{errors.tipo.message}</span>}
          </span>

          <span style={spanStyle}>
            <input
              {...register("coord.x")}
              status={errors.x ? "error" : "success"}
              type="text"
              placeholder="Coordenada X"
              style={inputStyle}
            />
            {errors.x && <span>{errors.x.message}</span>}
          </span>

          <span style={spanStyle}>
            <input
              {...register("coord.y")}
              status={errors.y ? "error" : "success"}
              type="text"
              placeholder="Coordenada Y"
              style={inputStyle}
            />
            {errors.y && <span>{errors.y.message}</span>}
          </span>
        </Space>

        <Divider />

        <Space
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "initial",
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

        <Button type="primary" htmlType="submit">
          Salvar obra
        </Button>
      </form>
    </Space>
  );
}

export default CreateProject;
