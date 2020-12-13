import { Col, Row, Typography } from 'antd';
import axios from "axios";
import ChartCard from "components/chart-card";
import Sidebar from "components/sidebar";
import StatCard from "components/statistic-card";
import { Auth } from 'modules/context';
import React, { useContext, useEffect, useState } from "react";
const { Title } = Typography;

export default function Index(props) {

  const [foundChartData, setFoundChartData] = useState([])
  const [lostChartData, setLostChartData] = useState([])
  const [statData, setStatData] = useState({})



  const [user] = useContext(Auth)

  // -- Effect --
  useEffect(() => {
    getStatData()
    // getChartData("hilang")
    // getChartData("ditemukan")
  },[])

  // -- API call --
  function getChartData(status) {
    let config = {
      method: "get",
      // only support v1 API
      url: `https://megabit-lostnfound.herokuapp.com/api/v1/histories/count?status=${status}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    // axios(config)
    //   .then((res) => {
    //     setData(res.data.data);
    //     setPaginationData(res.data.meta)
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setTableLoading(false))
  }

  function getStatData() {
    let config = {
      method: "get",
      // only support v1 API
      url: `https://megabit-lostnfound.herokuapp.com/api/v1/histories/monthly-count`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setStatData(res.data);
      })
      .catch((err) => console.log(err))
      // .finally(() => setTableLoading(false))
  }

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
                <StatCard
                  title="Laporan barang hilang"
                  // isIncreased={statData.this_month.hilang > statData?.last_month?.hilang ? true : false }
                  stats={statData.this_month.hilang ?? 0}
                  change={statData.percentage.hilang ?? 0}
                />
              </Col>
              <Col span={6}>
                <StatCard
                  title="Barang ditemukan"
                  stats={statData.this_month.ditemukan ?? 0}
                  change={statData.percentage.ditemukan ?? 0}
                />
              </Col>
              <Col span={6}>
                <StatCard
                  title="Barang berhasil diklaim"
                  stats={statData.this_month.diklaim ?? 0}
                  change={statData.percentage.diklaim ?? 0}
                />
              </Col>
              <Col span={6}>
                <StatCard
                  title="Barang didonasikan"
                  isIncreased
                  stats={statData.this_month.didonasikan ?? 0}
                  change={statData.percentage.didonasikan ?? 0}
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