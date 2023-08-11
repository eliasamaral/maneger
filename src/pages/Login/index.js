import React, { useState, useContext } from "react";
import { AuthContext } from "../../utility/context/authContext";
import { useForm } from "../../utility/hooks";
import { Button, Typography, Form, Input, Alert } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../Schemas";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Login() {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    matricula: null,
    senha: "",
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Title level={2}>
          Acessar o <strong>Meneger.</strong>
        </Title>
        <Form
          onFinish={onSubmit}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            label="Matricula"
            name="matricula"
            rules={[
              {
                required: true,
                message: "Obrigatorio.",
              },
            ]}
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Input
              bordered={false}
              onChange={onChange}
              type="number"
              name="matricula"
              placeholder="15715"
              style={{
                borderBottom: "1px solid #ccc",
                borderRadius: "0",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="senha"
            rules={[
              {
                required: true,
                message: "Obrigatorio.",
              },
            ]}
          >
            <Input
              bordered={false}
              onChange={onChange}
              type="password"
              name="senha"
              placeholder="**********"
              style={{
                borderBottom: "1px solid #ccc",
                borderRadius: "0",
              }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Entrar
            </Button>
          </Form.Item>
        </Form>

        {errors.map(function (error, index) {
          return (
            <Alert
              key={index}
              message="Error"
              description={error.message}
              type="error"
              showIcon
            />
          );
        })}
      </div>
    </div>
  );
}
