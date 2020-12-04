import React, { useContext, useEffect, useState } from "react";
import { Typography } from "antd";
import axios from "axios";
import { Auth } from "modules/context";
import Sidebar from "components/sidebar";
import DataTable from "components/data-table";
import InputModal from "components/input-modal";
import UpdateModal from "components/update-modal";
import swal from "sweetalert";
const { Title } = Typography;

function Index(props) {
  const [user] = useContext(Auth);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // -- table data start --

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getData() {
    let config = {
      method: "get",
      url: "https://megabit-lostnfound.herokuapp.com/api/v1/barang",
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  const dataWithIndex = data.map((el, index) => ({ no: index + 1, ...el }));

  // -- table data end --

  // -- input modal content start --

  const showModal = (isShow) => {
    setShowInputModal(isShow);
  };
  function submitUpdateForm() {
    alert("form update submitted");
  }

  function submitForm(fieldsValue) {
    let isImageError = images.filter((img) => img.status === "error");
    if (isImageError.length > 0) {
      swal("Failed!", "Failed to upload the images", "error");
    } else {
      let config = {
        method: "post",
        url: "https://megabit-lostnfound.herokuapp.com/api/v2/barang/",
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          ...fieldsValue,
          user_id: user.id,
          tanggal: fieldsValue["tanggal"].format("YYYY-MM-DD"),
        },
      };
      axios(config)
        .then((res) => {
          images.forEach((image, index) => {
            console.log(res)
            let config = {
              method: "post",
              url:
                "https://megabit-lostnfound.herokuapp.com/api/v2/barang-images",
              headers: { Authorization: `Bearer ${user.token}` },
              data: {
                barang_id: res.data.id,
                nama: res.data.nama_barang,
                uri: image.thumbUrl,
              },
            };

            axios(config)
              .then((res) => {
                if (images.length - 1 === index) {
                  swal("Success!", "Data Added Successfully", "success");
                  window.location.url = '/lost'
                }
              })
              .catch((err) => {
                console.log(err)
                swal("Failed!", "Failed to add the data", "error");
              });
          });
        })
        .catch((err) => console.log(err));
    }
  }

  // -- detail modal start

  const detailModal = (isShow) => {
    setShowDetailModal(isShow);
  };

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Barang Hilang</Title>
            <DataTable
              dataWithIndex={dataWithIndex}
              inputModal={showModal}
              detailModal={detailModal}
              enableInput={true}
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
