import { Typography } from "antd";
import axios from "axios";
import DataTable from "components/data-table";
import InputModal from "components/input-modal";
import Sidebar from "components/sidebar";
import UpdateModal from "components/update-modal";
import { API_URL, Auth } from "modules/context";
import React, { useContext, useState } from "react";

const { Title } = Typography;

function Index(props) {
  const [user] = useContext(Auth);
  const [data, setData] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [tableLoading, setTableLoading] = useState(false)
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

  // -- API Call --
  function getData(filter = "") {
    setTableLoading(true)

    let config = {
      method: "get",
      url: `${API_URL}/barang?status_id=3${filter}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setTableLoading(false))
  }

  // -- input modal content start --

  const showModal = (isShow) => {
    setShowInputModal(isShow);
  };

  function submitForm() {
    alert("form input submitted");
  }

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
            <Title>Barang Didonasikan</Title>
            <DataTable
              data={data}
              inputModal={() => setShowInputModal(true)}
              detailModal={detailModal}
              isLoading={tableLoading}
              loadingHandler={(value) => setTableLoading(value)}
              getData={getData}
            />
            <InputModal
              modalData={images}
              visible={showInputModal}
              visibleHandler={showModal}
              imagesHandler={(value) => setImages(value)}
              submitForm={submitForm}
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
