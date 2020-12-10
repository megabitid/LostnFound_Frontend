import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Typography } from "antd";
import { Auth, API_URL } from "modules/context";
import Sidebar from "components/sidebar";
import DataTable from "components/data-table";
import InputModal from "components/input-modal";
import UpdateModal from "components/update-modal";
const { Title } = Typography;

function Index(props) {
  const childRef = useRef();
  const [user] = useContext(Auth);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [detailID, setDetailID] = useState(undefined);
  const [tableLoading, seTableLoading] = useState(false);
  const [isInputLoading, setIsInputLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // -- table data start --

  function getData(filter = "") {
    seTableLoading(true);
    let config = {
      method: "get",
      url: `${API_URL}/barang?${filter}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => seTableLoading(false))
  }

  // -- table data end --

  // -- input modal content start --

  const showModal = (isShow) => {
    setShowInputModal(isShow);
  };

  function submitForm(fieldsValue) {
    setIsInputLoading(true);
    let isImageError = images.filter((img) => img.status === "error");
    if (isImageError.length > 0) {
      swal("Failed!", "Failed to upload the images", "error");
    } else {
      let config = {
        method: "post",
        url: `${API_URL}/barang`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          ...fieldsValue,
          user_id: user.id,
          tanggal: fieldsValue["tanggal"].format("YYYY-MM-DD"),
        },
      };
      axios(config)
        .then((res) => {
          console.log(res);
          images.forEach((image, index) => {
            let config = {
              method: "post",
              url: `${API_URL}/barang-images`,
              headers: { Authorization: `Bearer ${user.token}` },
              data: {
                barang_id: res.data.id,
                nama: res.data.nama_barang,
                uri: image.thumbUrl,
              },
            };

            axios(config)
              .then((res) => {
                console.log(res);
                if (images.length - 1 === index) {
                  swal("Success!", "Data Added Successfully", "success");
                  getData();
                  setIsInputLoading(false);
                  setShowInputModal(false);
                  setImages([]);
                  childRef.current.resetForm();
                }
              })
              .catch((err) => {
                console.log(err);
                setIsInputLoading(false);
                setShowInputModal(false);
                setImages([]);
                swal("Failed!", "Failed to add the data", "error");
              });
          });
        })
        .catch((err) => console.log(err));
    }
  }

  // -- detail modal start

  const detailModal = (isShow, id) => {
    setDetailID(id);
    setShowDetailModal(isShow);
  };

  function submitUpdateForm(value) {
    setIsUpdateLoading(true)
    let body = {
      _method : 'PATCH',
      status_id : value
    }


    let config = {
      method: "post",
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
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Barang Hilang</Title>
            <DataTable
              data={data}
              inputModal={showModal}
              detailModal={detailModal}
              enableInput={true}
              lostPage={true}
              getData={getData}
              isLoading={tableLoading}
              setIsLoading={seTableLoading}
              loadingHandler={(value) => seTableLoading(value)}
            />
            <InputModal
              modalData={images}
              isLoading={isInputLoading}
              loadingHandler={(value) => setIsInputLoading(value)}
              visible={showInputModal}
              visibleHandler={showModal}
              imagesHandler={(value) => setImages(value)}
              submitForm={submitForm}
              ref={childRef}
            />
            <UpdateModal
              id={detailID}
              modalData={images}
              reloadData={getData}
              visible={showDetailModal}
              isLoading={isUpdateLoading}              
              visibleHandler={detailModal}
              imagesHandler={(value) => setImages(value)}
              loadingHandler={(value) => setIsUpdateLoading(value)}
              submitUpdateForm={submitUpdateForm}
            />
          </div>
        }
      />
    </div>
  );
}

export default Index;
