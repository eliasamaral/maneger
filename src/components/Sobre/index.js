import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

function Sobre() {
  return (
    <>
      <Card
        title="Sobre"
        style={{
          width: 300,
          marginTop: 16,
        }}
      >
        <Typography>
          <Text style={{ fontSize: "14px" }}>Peso: 2500kg</Text>
        </Typography>
      </Card>
    </>
  );
}

export default Sobre;
