import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Card,
  Space,
  Button,
  Spin,
  FloatButton,
  Modal,
  Popconfirm,
  notification,
} from "antd";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_PROJETOS, DELETE_PROJETOS } from "../../Schemas";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import NovoProjeto from "../../components/Formularios/NovoProjeto";

function Projetos() {
  const { data, loading } = useQuery(GET_PROJETOS);
  const [deleteProjeto] = useMutation(DELETE_PROJETOS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Sucesso",
      description: "Obra deletada.",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/projeto/${e}`);
  };

  const onFinish = () => {
    setIsModalOpen(false);
  };

  const confirm = (id) => {
    deleteProjeto({
      variables: {
        id,
      },
      refetchQueries: [GET_PROJETOS],
    });

    openNotificationWithIcon("success");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  const { getProjetos } = data;

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "initial",
      }}
    >
      {contextHolder}
      <Modal
        title="Novo Projeto"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"80%"}
        footer={null}
        centered={true}
        keyboard={true}
      >
        <NovoProjeto onFinishProp={onFinish} />
      </Modal>

      <Space
        wrap={true}
        style={{
          display: "flex",
          alignItems: "initial",
        }}
      >
        {getProjetos.map((obra) => (
          <Card
            size="small"
            title={obra.local}
            key={obra.id}
            extra={
              <>
                <Button type="link" onClick={() => handleClick(obra.projeto)}>
                  <EyeOutlined />
                </Button>
                <Popconfirm
                  title="Deletar projeto"
                  description="Você deseja realmente deletar esse projeto?"
                  onConfirm={() => {
                    confirm(obra.id);
                  }}
                  okText="Deletar"
                  cancelText="Voltar"
                >
                  <Button danger type="link">
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              </>
            }
            style={{
              width: 290,
            }}
          >
            <p>{obra.projeto}</p>
          </Card>
        ))}
      </Space>
      <FloatButton
        tooltip={<div>Adicionar obra</div>}
        shape="circle"
        type="primary"
        style={{
          right: 94,
        }}
        icon={<PlusOutlined />}
        onClick={showModal}
      />
    </Space>
  );
}

export default Projetos;
