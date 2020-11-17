import React, { useContext, useState } from 'react';
import { Auth } from "../../modules/context"
import { Redirect } from "react-router-dom"
import { Col, Card, Form, Input, Button, notification } from "antd"
import Logo from "../../assets/logo.png";
import Axios from 'axios';

function Index() {

    const [isLoading, setLoading] = useState(false);
    const [user, setUser]         = useContext(Auth)

    const onFinish = async (value) => {

      try {

          setLoading(true);

          let res = await Axios.post(
              "https://megabit-lostnfound.herokuapp.com/api/v1/web/auth/login",
              { nip: value.nip, password: value.password }
          )

          console.log(res.data);

          let currentUser = res.data;

          setUser(currentUser);

          localStorage.setItem("user", JSON.stringify(currentUser));

      } catch (e) {

          notification["error"]({
              message: "Gagal login",
              description: e.message
          })
      } finally {

          setLoading(false)
      }
  }

  return user !== null
    ? <Redirect to={"/dashboard"} />
    : (
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
              style={{ fontWeight: "500", textAlign: "left" }}
              onFinish={onFinish}
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
                  <div style={{textAlign: "right"}}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#1b68b1",
                        borderRadius: "3px"
                      }}
                      loading={isLoading}
                    >
                      Login
                  </Button>
                  </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </div >
    );
}

export default Index;