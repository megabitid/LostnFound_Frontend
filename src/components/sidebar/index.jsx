import React, { useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import Logo from "../../assets/logo.png";
import Profile from "../../assets/profile.png";
import { Layout, Menu, Avatar, Typography } from "antd";
import { Link } from "react-router-dom";
import { Auth } from "../../modules/context";
const { Content, Sider } = Layout;
const { Text } = Typography;

function Index(props) {
  const [user] = useContext(Auth);

  useEffect(() => {
    let expiredTokenTime = user.exp;
    let newDate = Math.round(+new Date() / 1000);

    if (expiredTokenTime <= newDate) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function logoutHandler() {
    swal({
      title: "LOG OUT",
      text: "Apakah anda yakin ingin Log Out dari aplikasi ini ?",
      buttons: ["Tidak", "Ya"],
      dangerMode: true,
    }).then((removeData) => {
      if (removeData) {
        let config = {
          method: "get",
          url:
            "https://megabit-lostnfound.herokuapp.com/api/v1/web/auth/logout",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        axios(config)
          .then((res) => {
            localStorage.clear();
            window.location.href = "/login";
          })
          .catch((err) => console.log(err));
      } else {
        return;
      }
    });
  }

  const iconStyle = {
    position: "absolute",
    top: "-1px",
    fontSize: "1.2rem",
    color: "#8A8A8A",
  };

  const iconText = { marginLeft: "1.5rem" };

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
            <Menu.Item
              icon={<i class="ri-dashboard-fill" style={iconStyle}></i>}
              key="/dashboard"
            >
              <Link to="/dashboard" style={iconText}>
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item
              icon={<i class="ri-question-fill" style={iconStyle}></i>}
              key="/lost"
            >
              <Link to="/lost" style={iconText}>
                Barang hilang
              </Link>
            </Menu.Item>
            <Menu.Item
              icon={<i class="ri-checkbox-circle-fill" style={iconStyle}></i>}
              key="/found"
            >
              <Link to="/found" style={iconText}>
                Barang ditemukan
              </Link>
            </Menu.Item>
            <Menu.Item
              icon={<i class="ri-folder-info-fill" style={iconStyle}></i>}
              key="/claim"
            >
              <Link to="/claim" style={iconText}>
                Permintaan klaim
              </Link>
            </Menu.Item>
            <Menu.Item
              icon={<i class="ri-hand-coin-fill" style={iconStyle}></i>}
              key="/claimed"
            >
              <Link to="/claimed" style={iconText}>
                Barang diklaim
              </Link>
            </Menu.Item>

            {user.role === 2 && (
              <Menu
                mode="inline"
                style={{ height: "100%", borderRight: 0 }}
                defaultSelectedKeys={[window.location.pathname]}
              >
                <Menu.Item
                  icon={<i class="ri-gift-fill" style={iconStyle}></i>}
                  key="/donated"
                >
                  <Link to="/donated" style={iconText}>
                    Barang didonasikan
                  </Link>
                </Menu.Item>
                <Menu.Item
                  icon={<i class="ri-user-fill" style={iconStyle}></i>}
                  key="/admins"
                >
                  <Link to="/admins" style={iconText}>
                    Data Admin
                  </Link>
                </Menu.Item>
              </Menu>
            )}

            <p className="logout-style" onClick={logoutHandler}>
              <i class="ri-logout-box-fill" style={iconStyle}></i>
              <span style={iconText}>Logout</span>
            </p>
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
