import { Table } from "antd";

import usePontoContext from "../../utility/hooks";

function Serviços() {
  const { pontoInicial } = usePontoContext();
  console.log(pontoInicial);

  const columns = [
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "1",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Orçado",
      dataIndex: "qntOrcada",
      key: "qntOrcada",
    },
    {
      title: "Executado",
      dataIndex: "qntExecutada",
      key: "qntExecutada",
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={pontoInicial.srv}
      scroll={{ y: "80vh" }}
      style={{ width: "1050px", marginInlineStart: "16px" }}
    />
  );
}

export default Serviços;
