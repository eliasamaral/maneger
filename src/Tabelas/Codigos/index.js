import { DeleteTwoTone, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Tag,
  Spin,
  message,
  Drawer,
  Popconfirm,
} from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { useQuery } from "@apollo/client";
import { GET_CODIGOS } from "../../Schemas";

const onChangeFilter = (filters) => {
  console.log(filters);
};

function Codigos() {
  //Buscar dados no servidor
  const { data, loading } = useQuery(GET_CODIGOS);

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  //Exibir Drawer para edição do codigo
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Você ainda não tem permissão para isso.",
    });
  };

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Pesquisa por Descrição`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 100,
            }}
          >
            Pesquisar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Limpar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Todos
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Codigo",
      dataIndex: "code",
      key: "code",
      sorter: {
        compare: (a, b) => a.code - b.code,
        multiple: 2,
      },
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Tipo",
      key: "tipo",
      dataIndex: "tipo",
      filters: [
        {
          text: "Novo",
          value: "novo",
        },
        {
          text: "Serviço",
          value: "serviço",
        },
        {
          text: "Sucata",
          value: "sucata",
        },
      ],
      onFilter: (value, record) => record.tipo.indexOf(value) === 0,
      render: (_, { tipo }) => {
        let color = tipo === "sucata" ? "cyan" : "blue";
        if (tipo === "novo") {
          color = "green";
        }
        return (
          <Tag color={color} key={tipo}>
            {tipo.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={showDrawer}>
            <EditTwoTone style={{ fontSize: "22px" }} />
          </Button>
          <Popconfirm title="Esta certo disso?">
            <Button type="link" onConfirm={warning}>
              <DeleteTwoTone
                twoToneColor="#d90000"
                style={{ fontSize: "22px" }}
              />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Drawer
        title="Editar codigo"
        placement="right"
        onClose={onClose}
        open={open}
      ></Drawer>
      {contextHolder}

      {!loading ? (
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data.codigos}
          onChange={onChangeFilter}
          pagination={{ pageSize: 100 }}
          scroll={{ y: 650 }}
        />
      ) : (
        <Spin
          size="large"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",

          }}
        />
      )}
    </Space>
  );
}

export default Codigos;
