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

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]


  const [user] = useContext(Auth)

  // -- Chart Data Processing --
  const objectMap = (obj, fn) =>
    Object.entries(obj).map(
      ([k, v], i) => fn(k, v, i)
    )

  const normalizeData = (k, v) => {
    let dayIndex = new Date(k).getDay();
    let dayName = days[dayIndex]

    return { dayIndex, dayName, date: k, items: v }
  }

  // -- API call --
  function getChartData(status) {
    let config = {
      method: "get",
      // only support v1 API
      url: `https://megabit-lostnfound.herokuapp.com/api/v1/histories/count?status=${status}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        let normalizedData = objectMap(res.data, (key, val) => normalizeData(key, val))
        switch (status) {
          case "hilang":
            setLostChartData(normalizedData)
            break;
          case "ditemukan":
            setFoundChartData(normalizedData)
            break;
          default:
            break;
        }
      })
      .catch((err) => console.log(err))
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
  }

  // -- Effect --
  useEffect(() => {
    getStatData()
    getChartData("hilang")
    getChartData("ditemukan")
  }, [])

  return (
    <div>
      <Sidebar
        content={
          <>
            <Title>Dashboard</Title>
            <Row gutter={ [66, 48] }>
              <Col span={ 6 }>
                <StatCard
                  title="Laporan barang hilang"
                  // isIncreased={statData.this_month.hilang > statData?.last_month?.hilang ? true : false }
                  stats={ statData?.this_month?.hilang ?? 0 }
                  change={ statData?.percentage?.hilang ?? 0 }
                />
              </Col>
              <Col span={ 6 }>
                <StatCard
                  title="Barang ditemukan"
                  stats={ statData?.this_month?.ditemukan ?? 0 }
                  change={ statData?.percentage?.ditemukan ?? 0 }
                />
              </Col>
              <Col span={ 6 }>
                <StatCard
                  title="Barang berhasil diklaim"
                  stats={ statData?.this_month?.diklaim ?? 0 }
                  change={ statData?.percentage?.diklaim ?? 0 }
                />
              </Col>
              <Col span={ 6 }>
                <StatCard
                  title="Barang didonasikan"
                  isIncreased
                  stats={ statData?.this_month?.didonasikan ?? 0 }
                  change={ statData?.percentage?.didonasikan ?? 0 }
                />
              </Col>
            </Row>
            <Row gutter={ 66 }>
              <Col span={ 12 }>
                <ChartCard
                  isLost
                  data={ lostChartData }
                />
              </Col>
              <Col span={ 12 }>
                <ChartCard
                  data={ foundChartData }
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
}