import React, { useContext, useState, useRef } from "react";
import { Typography } from "antd";
import swal from "sweetalert";
import axios from "axios";
import AdminTable from "components/admin-table";
import Sidebar from "components/sidebar";
import { API_URL, Auth } from "modules/context";
import InputAdmin from "components/input-admin";
import UpdateAdmin from "components/update-admin";
const { Title } = Typography;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default function Index(props) {
  const childRef = useRef();
  const [user] = useContext(Auth);
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState("");
  const [detailID, setDetailID] = useState(undefined);
  const [tableLoading, setTableLoading] = useState(false);
  const [isInputLoading, setIsInputLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  //  ----[ Filter is not working yet due to unavalaible API] ----

  function getUsers(filter = "") {
    setTableLoading(true);

    let config = {
      method: "get",
      url: `${API_URL}/web/users/${filter}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setTableLoading(false));
  }

  const showModal = (isShow) => {
    setShowInputModal(isShow);
  };
  const detailModal = (isShow, id) => {
    setDetailID(id);
    setShowDetailModal(isShow);
  };

  const imageHandler = (info) => {
    // console.log(info);
    if (info.file.status === "uploading") {
      setLoadingImg(true);
      return;
    }

    if (info.file.status === "error") {
      swal("Error", "Failed to upload image", "warning");
      setLoadingImg(false);
      setImage("");
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoadingImg(false);
        setImage(imageUrl);
      });
    }
  };

  function initialValue() {
    setImage("");
    setDetailID(undefined);
    setIsInputLoading(false);
    setShowInputModal(false);
    setIsUpdateLoading(false);
    setShowDetailModal(false);
    childRef.current.resetForm();
  }

  const submitForm = (form) => {
    setIsInputLoading(true);
    let body = form;
    body.password = body.nip;
    body.image = image;

    let config = {
      method: "post",
      url: `${API_URL}/web/auth/register`,
      headers: { Authorization: `Bearer ${user.token}` },
      data: body,
    };

    axios(config)
      .then((res) => {
        swal({
          title: "Sukses",
          text: "Data Added Successfully",
          buttons: "OK",
          icon: "success",
        })
          .then((removeData) => {
            getUsers();
            initialValue();
          })
          .catch((err) => {
            swal("Failed", "Failed to save data", "error");
            initialValue();
          });
      })
      .catch((err) => {
        console.log(err);
        swal("Failed", "Failed to save data", "error");
        initialValue();
      });
  };

  function submitUpdateForm(data) {
    setIsUpdateLoading(true);
    let body = {
      _method: 'PATCH',
      role : data
    }
    let config = {
      method: "post",
      url: `${API_URL}/web/users/${detailID}`,
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
            getUsers();
            initialValue();
          })
          // .catch((err) => {
          //   console.log(err)
          //   swal("Failed", "Failed to save data", "error");
          //   initialValue();
          // });
      })
      .catch((err) => {
        console.log(err);
        swal("Failed", "Failed to save data", "error");
        initialValue();
      });

    console.log(data)
  }

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Data Admin</Title>
            <AdminTable
              data={users}
              getData={getUsers}
              isLoading={tableLoading}
              loadingHandler={(value) => setTableLoading(value)}
              inputModal={showModal}
              detailModal={detailModal}
            />
            <InputAdmin
              image={image}
              isLoading={isInputLoading}
              loadingHandler={(value) => setIsInputLoading(value)}
              loadingImg={loadingImg}
              setLoadingImg={(value) => setLoadingImg(value)}
              visible={showInputModal}
              closeModal={initialValue}
              imageHandler={imageHandler}
              submitForm={submitForm}
              ref={childRef}
            />
            <UpdateAdmin
              id={detailID}
              image={image}
              reloadData={getUsers}
              visible={showDetailModal}
              isLoading={isUpdateLoading}
              closeModal={initialValue}
              imageHandler={(value) => setImage(value)}
              loadingHandler={(value) => setIsUpdateLoading(value)}
              submitUpdateForm={submitUpdateForm}
            />
          </div>
        }
      />
    </div>
  );
}
