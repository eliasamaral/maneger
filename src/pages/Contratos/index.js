import React, { useState } from "react";

import { Card, Space, Button, FloatButton, Modal } from "antd";

import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import NovoProjeto from "../../components/Formularios/NovoProjeto";

export default function Contratos() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
    setIsModalOpen(false);
  };

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "initial",
      }}
    >
      <Modal
        title="Novo Projeto"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={900}
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
        <Card
          size="small"
          title={"Venda Nova"}
          key={"1"}
          extra={
            <>
              <Button type="link">
                <EyeOutlined />
              </Button>
            </>
          }
          style={{
            width: 290,
          }}
        >
          <p>N° 400215424</p>
          <p>Fator K : 2,584</p>
        </Card>
      </Space>
      <FloatButton
        tooltip={<div>Adicionar contrato</div>}
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
