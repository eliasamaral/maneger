import { Table } from "antd";

import usePontoContext from "../../utility/hooks";

function Pendencias() {
  const { pontoInicial } = usePontoContext();

  const columns = [
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "1",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={ pontoInicial.pendencias}
        pagination={{ pageSize: 100 }}
        scroll={{ y: "80vh" }}
        style={{ width: "1050px", marginInlineStart: "16px" }}
      />
    </>
  );
}

export default Pendencias;
