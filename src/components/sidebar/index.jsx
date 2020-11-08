import React from "react";
import Logo from "../../assets/logo.png";
import Profile from "../../assets/profile.png";
import { Layout, Menu, Avatar, Typography } from "antd";
import {
  DashboardOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Content, Sider } = Layout;
const { Text } = Typography;

function Index(props) {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={[window.location.pathname]}
          >
            <img
              src={Logo}
              alt=""
              width="80"
              style={{ margin: "2rem auto", display: "block" }}
            />
            <Avatar
              src={Profile}
              size={64}
              style={{ margin: "2rem auto", display: "block" }}
            />

            <div align="center" style={{ margin: "-1rem 0 2rem 0" }}>
              <Text strong>
                <h5>Dita Karang</h5>
              </Text>
              <h5>Admin Stasiun Gambir</h5>
            </div>
            <Menu.Item icon={<DashboardOutlined />} key="/dashboard">
              <Link to="/dashboard"> Dashboard</Link>
            </Menu.Item>
            <Menu.Item icon={<QuestionCircleOutlined />} key="/lost">
              <Link to="/lost">Barang Hilang</Link>
            </Menu.Item>
            <Menu.Item icon={<CheckCircleOutlined />} key="/found">
              <Link to="/found">Barang Ditemukan</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* DISINI ADALAH KONTEN */}
            {props.content}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Index;
