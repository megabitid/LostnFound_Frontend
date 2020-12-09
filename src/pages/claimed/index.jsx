import { Typography } from "antd";
import axios from "axios";
import DataTable from "components/data-table";
import Sidebar from "components/sidebar";
import { API_URL, Auth } from "modules/context";
import React, { useContext, useState } from "react";

const { Title } = Typography;

function Index(props) {
  const [data, setData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const [user] = useContext(Auth);

  // -- API Call --
  function getData(filter = "") {
    setTableLoading(true);

    let config = {
      method: "get",
      url: `${API_URL}/barang?status_id=4${filter}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        console.log(res)
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setTableLoading(false));
  }

  // -- table data end --

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Barang Diklaim</Title>
            <DataTable
              data={data}
              getData={getData}
              isLoading={tableLoading}
            />
            {/* <UpdateModal
              modalData={images}
              visible={showDetailModal}
              visibleHandler={detailModal}
              imagesHandler={(value) => setImages(value)}
              submitUpdateForm={submitUpdateForm}
            /> */}
          </div>
        }
      />
    </div>
  );
}

export default Index;
