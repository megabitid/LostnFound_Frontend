import { Typography } from "antd";
import axios from "axios";
import DataTable from "components/data-table";
import Sidebar from "components/sidebar";
import UpdateModal from "components/update-modal";
import { Auth } from "modules/context";
import React, { useContext, useEffect, useState } from "react";

const { Title } = Typography;

function Index(props) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [data, setData] = useState([])
  const [tableLoading, setTableLoading] = useState(false)

  const [user] = useContext(Auth);

  const [images, setImages] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

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
      url: "https://megabit-lostnfound.herokuapp.com/api/v1/barang?status_id=4",
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
              detailModal={detailModal}
              dataWithIndex={dataWithIndex}
              isLoading={tableLoading}
              getData={getData}
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