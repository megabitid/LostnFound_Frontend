import { Typography } from "antd";
import axios from "axios";
import swal from "sweetalert";
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
  const [detailID, setDetailID] = useState(undefined);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [images, setImages] = useState([]);

  // -- table data start --
  // -- API Call --
  function getData(filter = "") {
    setTableLoading(true);

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
      .finally(() => setTableLoading(false));
  }

  // -- input modal content start --

  const showModal = (isShow) => {
    setShowInputModal(isShow);
  };

  function submitForm() {
    alert("form input submitted");
  }

  // -- detail modal

  const detailModal = (isShow, id) => {
    setDetailID(id);
    setShowDetailModal(isShow);
  };

  function submitUpdateForm(datas) {
    setIsUpdateLoading(true)
    let body = datas;
    delete body["id"];
    delete body["warna"];
    delete body["merek"];
    delete body["lokasi"];
    delete body["created_at"];
    delete body["updated_at"];

    let config = {
      method: "put",
      url: `${API_URL}/barang/${detailID}`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: body,
    };

    console.log(config);
    axios(config)
      .then((res) => {
        console.log(res);
        swal({
          title: "Sukses",
          text: "Data Updated Successfully",
          buttons: "OK",
          icon: "success",
        })
          .then((removeData) => {
            getData();
            setTableLoading(false);
            setIsUpdateLoading(false)
            setShowDetailModal(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    console.log(detailID);
    console.log(body);
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
              id={detailID}
              modalData={images}
              reloadData={getData}
              visible={showDetailModal}
              visibleHandler={detailModal}
              submitUpdateForm={submitUpdateForm}
              imagesHandler={(value) => setImages(value)}
              isLoading={isUpdateLoading}
              loadingHandler={(value) => setIsUpdateLoading(value)}
            />
          </div>
        }
      />
    </div>
  );
}

export default Index;
