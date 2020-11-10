import React from 'react';
import { Col, Card, Form, Input, Button } from "antd"
import Logo from "../../assets/logo.png";

function index(props) {
  return (
    <div style={{
      backgroundColor: "#f7f8fc",
      textAlign: "center",
      fontFamily: "poppins",
      height: "100vh"
    }} >

      <img
        src={Logo}
        alt=""
        width="236px"
        style={{ marginTop: "80px" }}
      />

      <h1 style={{ fontSize: "48px", fontWeight: "500", margin: "24px 0" }}>Login admin</h1>

      <Col
        span={8} offset={8}
      >
        <Card
          style={{
            boxShadow: "0px 0px 30px rgba(0, 9, 44, 0.1)",
            borderRadius: "5px",
            padding: "8px"
          }}
        >
          <Form
            layout="vertical"
            style={{ fontWeight: "500" }}
          >
            <Form.Item
              label="NIP"
              name="nip"
              requiredMark="optional"
              rules={[{ required: true, message: 'Mohon masukkan nomor induk pegawai anda!' }]}
            >
              <Input
                placeholder="Masukkan nomor induk pegawai anda"
                style={{ borderRadius: "3px", padding: "12px" }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              requiredMark="optional"
              rules={[{ required: true, message: 'Mohon masukkan password anda!' }]}
            >
              <Input.Password
                placeholder="Masukkan password anda"
                style={{ borderRadius: "3px", padding: "12px" }}
              />
            </Form.Item>

            <Form.Item style={{ margin: 0 }}  >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  float: "right",
                  fontWeight: 500,
                  padding: "22px 32px",
                  lineHeight: 0,
                  backgroundColor: "#1b68b1",
                  borderRadius: "3px"
                }}
              >
                Login
              </Button>
            </Form.Item>

          </Form>
        </Card>
      </Col>
    </div >
  );
}

export default index;