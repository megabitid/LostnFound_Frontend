import { Col, Row, Typography } from 'antd';
import React from "react";
import ChartCard from "../../components/chart-card";
import Sidebar from "../../components/sidebar";
import StatCrad from "../../components/statistic-card";
const { Title } = Typography;

function index(props) {

  const lostItems = [
    { hari: 'Senin', jumlah: 4 },
    { hari: 'Selasa', jumlah: 2 },
    { hari: 'Rabu', jumlah: 3 },
    { hari: 'Kamis', jumlah: 1 },
    { hari: 'Jumat', jumlah: 4 },
    { hari: 'Sabtu', jumlah: 3 },
    { hari: 'Minggu', jumlah: 4 },
  ];

  const foundItems = [
    { hari: 'Senin', jumlah: 4 },
    { hari: 'Selasa', jumlah: 3 },
    { hari: 'Rabu', jumlah: 3 },
    { hari: 'Kamis', jumlah: 1 },
    { hari: 'Jumat', jumlah: 3 },
    { hari: 'Sabtu', jumlah: 1 },
    { hari: 'Minggu', jumlah: 4 },
  ];


  return (
    <div>
      <Sidebar
        content={
          <>
            <Title>Dashboard</Title>
            <Row gutter={[66, 48]}>
              <Col span={6}>
                <StatCrad
                  isIncreased
                  stats={23}
                  title="Laporan barang hilang"
                  change={9}
                />
              </Col>
              <Col span={6}>
                <StatCrad
                  stats={11}
                  title="Barang ditemukan"
                  change={20}
                />
              </Col>
              <Col span={6}>
                <StatCrad
                  stats={98}
                  title="Barang berhasil diklaim"
                  change={17}
                />
              </Col>
              <Col span={6}>
                <StatCrad
                  isIncreased
                  stats={16}
                  title="Barang didonasikan"
                  change={9}
                />
              </Col>
            </Row>
            <Row gutter={66}>
              <Col span={12}>
                <ChartCard
                  isLost
                  data={lostItems}
                />
              </Col>
              <Col span={12}>
                <ChartCard
                  data={foundItems}
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
}

export default index;
