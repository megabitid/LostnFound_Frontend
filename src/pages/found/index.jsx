import React, { useContext, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Typography, Spin } from "antd";
import DataTable from "components/data-table";
import Sidebar from "components/sidebar";
import UpdateModal from "components/update-modal";
import { Auth, API_URL } from "modules/context";

const { Title } = Typography;

function Index(props) {
  const [user] = useContext(Auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [data, setData] = useState([]);
  const [detailID, setDetailID] = useState(undefined);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [images, setImages] = useState([]);
  const [tableLoading, setTableLoading] = useState(false)

  // -- table data start --

  // -- API Call --
  function getData(filter = "") {
    setTableLoading(true)

    let config = {
      method: "get",
      url: `${API_URL}/barang?status_id=2${filter}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setData(res.data.data);
        setTableLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setTableLoading(false))
  }

  // -- input modal content start --

  // -- detail modal

  const detailModal = (isShow, id) => {
    setIsUpdateLoading(true);
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

    axios(config)
      .then((res) => {
        swal({
          title: "Sukses",
          text: "Data Updated Successfully",
          buttons: "OK",
          icon: "success",
        })
          .then((removeData) => {
            getData();
            setIsUpdateLoading(false);
            setShowDetailModal(false);
          })
          .catch((err) => console.log(err));
      })
    //   .catch((err) => console.log(err));
    }
  return (
    <div>
      <Spin tip="Loading..." spinning={isLoading}>
        <Sidebar
          content={
            <div>
              <Title>Barang Ditemukan</Title>
              <DataTable
                foundPage={true}
                data={data}
                detailModal={detailModal}
                getData={getData}
                isLoading={tableLoading}
                loadingHandler={(value) => setIsLoading(value)}
              />
              <UpdateModal
                id={detailID}
                isLoading={isUpdateLoading}
                loadingHandler={(value) => setIsUpdateLoading(value)}
                modalData={images}
                visible={showDetailModal}
                visibleHandler={detailModal}
                imagesHandler={(value) => setImages(value)}
                submitUpdateForm={submitUpdateForm}
                reloadData={getData}
              />
            </div>
          }
        />
      </Spin>
    </div>
  );
}

export default Index;
