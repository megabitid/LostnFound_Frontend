import { Typography } from "antd";
import axios from "axios";
import DataTable from "components/data-table";
import Sidebar from "components/sidebar";
import UpdateModal from "components/update-modal";
import { Auth } from "modules/context";
import React, { useContext, useEffect, useState } from "react";

const { Title } = Typography;

function Index(props) {
  const [user] = useContext(Auth);
  const [data, setData] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [images, setImages] = useState([]);
  const [tableLoading, setTableLoading] = useState(false)

  // -- table data start --

  // -- Effect --
  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // -- API Call --
  function getData() {
    setTableLoading(true)

    let config = {
      method: "get",
      url: "https://megabit-lostnfound.herokuapp.com/api/v1/barang?status_id=2",
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setTableLoading(false))
  }
  const dataWithIndex = data.map((el, index) => ({ no: index + 1, ...el }));


  // -- input modal content start --

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
            <Title>Barang Ditemukan</Title>
            <DataTable
              dataWithIndex={dataWithIndex}
              detailModal={detailModal}
              foundPage={true}
              isLoading={tableLoading}
            />
            <UpdateModal
              modalData={images}
              visible={showDetailModal}
              visibleHandler={detailModal}
              imagesHandler={(value) => setImages(value)}
              submitUpdateForm={submitUpdateForm}
            />
          </div>
        }
      />
    </div>
  );
}

export default Index;
