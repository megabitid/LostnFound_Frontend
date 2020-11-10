import { Col, Row, Typography } from 'antd';
import React from "react";
import Sidebar from "../../components/sidebar";
import StatCrad from "../../components/statistic-card";
const { Title } = Typography;

function index(props) {
  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Dashboard</Title>
            <Row gutter={ [66, 48] }>
              <Col span={ 6 }>
                <StatCrad
                  isIncreased
                  stats={23}
                  title="Laporan barang hilang"
                  change={9}
                />
              </Col>
              <Col span={ 6 }>
                <StatCrad
                  stats={11}
                  title="Barang ditemukan"
                  change={20}
                />
              </Col>
              <Col span={ 6 }>
                <StatCrad
                  stats={98}
                  title="Barang berhasil diklaim"
                  change={17}
                />
              </Col>
              <Col span={ 6 }>
                <StatCrad
                  isIncreased
                  stats={16}
                  title="Barang didonasikan"
                  change={9}
                />
              </Col>
            </Row>
            <Row gutter={ 66 }>
              <Col span={ 12 } />
              <Col span={ 12 } />
            </Row>
          </div>
        }
      />
    </div>
  );
}

export default index;
