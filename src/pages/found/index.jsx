import { Typography } from 'antd';
import React from "react";
import DataTable from "../../components/data-table";
import Sidebar from "../../components/sidebar";
const { Title } = Typography;

function index(props) {
  return (
    <div>
      <Sidebar
        content={
          <div>
              <Title>Barang Ditemukan</Title>
              <DataTable/>
          </div>
        }
      />
    </div>
  );
}

export default index;
