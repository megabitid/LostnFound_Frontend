import React from "react";
import Sidebar from "../../components/sidebar";
import {Typography} from 'antd'
const { Title } = Typography;

function index(props) {
  return (
    <div>
      <Sidebar
        content={
          <div>
              <Title>Barang Ditemukan</Title>
          </div>
        }
      />
    </div>
  );
}

export default index;
