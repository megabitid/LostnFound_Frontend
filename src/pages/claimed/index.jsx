import { Typography } from "antd";
import axios from "axios";
import DataTable from "components/data-table";
import Sidebar from "components/sidebar";
import UpdateModal from "components/update-modal";
import { API_URL, Auth } from "modules/context";
import React, { useContext, useEffect, useState } from "react";

const { Title } = Typography;

function Index(props) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [data, setData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const [user] = useContext(Auth);

  function getCategory() {
    let config = {
      method: "get",
      url: "https://megabit-lostnfound.herokuapp.com/api/v1/barang-kategori",
      headers: { Authorization: `Bearer ${user.token}` },
    };
  }

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
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setTableLoading(false));
  }

  // -- table data end --

  // -- detail modal

  const detailModal = (isShow) => {
    setShowDetailModal(isShow);
  };

  function submitUpdateForm() {
    alert("form update submitted");
  }

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Barang Diklaim</Title>
            <DataTable
              data={data}
              getData={getData}
              detailModal={detailModal}
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
