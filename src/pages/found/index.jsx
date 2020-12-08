import React, { useContext, useEffect, useState } from "react";
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

  // -- table data start --

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getData() {
    setIsLoading(true);
    let config = {
      method: "get",
      url: `${API_URL}/barang?status_id=2`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  }
  const dataWithIndex = data.map((el, index) => ({ no: index + 1, ...el }));
  // -- input modal content start --

  // -- detail modal

  const detailModal = (isShow, id) => {
    console.log('tessss', id)
    setIsUpdateLoading(true);
    setDetailID(id);
    setShowDetailModal(isShow);
  };

  function submitUpdateForm(datas) {
    console.log('called')
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
            setIsUpdateLoading(false);
            setShowDetailModal(false);
          })
          .catch((err) => console.log(err));
      })
    //   .catch((err) => console.log(err));
    console.log(detailID);
    console.log(body);
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
                dataWithIndex={dataWithIndex}
                detailModal={detailModal}
                getData={getData}
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
