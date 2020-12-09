import { Typography, Form } from "antd";
import axios from "axios";
import ClaimTable from "components/claim-table";
import Sidebar from "components/sidebar";
import UpdateModal from "components/update-modal";
import VerificationModal from "components/verification-modal";
import { Auth } from "modules/context";
import React, { useContext, useState } from "react";

const { Title } = Typography;

function Index(props) {
  const [user] = useContext(Auth);
  const [data, setData] = useState([])
  const [images, setImages] = useState([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [tableLoading, setTableLoading] = useState(false)
  const [dataClaimAndUser, setDataClaimAndUser] = useState([])
  const [form] = Form.useForm();


  // -- table data start --

  function getData(filter = "") {
    setTableLoading(true)

    let config = {
      method: "get",
      // not wokring with v2 API
      url: `https://megabit-lostnfound.herokuapp.com/api/v1/claims?${filter}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        console.log(res)
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setTableLoading(false))
  }

  // -- table data end --

  // -- detail modal

  const detailModal = (isShow) => {
    setShowDetailModal(isShow);
  };

  function submitUpdateForm() {
    alert("form update submitted");
  }

  // -- verification modal
  const verificationModal = (dataClaim) => {
    setShowVerificationModal(true);
    console.log(dataClaim);
    let idUser = dataClaim.user_id
    // let mergeData = []
    axios.get(
      `https://megabit-lostnfound.herokuapp.com/api/v1/android/users/${idUser}`,
      { headers: { 'Authorization': `Bearer ${user.token}` } }
    ).then((res) => {
      console.log(res.data);
      let user = res.data
      let mergeData = { ...user, ...dataClaim }
      console.log(mergeData);
      setDataClaimAndUser(mergeData)
      form.setFieldsValue(mergeData)
    }).catch((err) => console.log(err));

  };

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Permintaan Klaim</Title>
            <ClaimTable
              data={data}
              detailModal={detailModal}
              verificationModal={verificationModal}
              isLoading={tableLoading}
              loadingHandler={(value) => setTableLoading(value)}
              getData={getData}
            />
            <VerificationModal
              showVerificationModal={showVerificationModal}
              setShowVerificationModal={setShowVerificationModal}
              dataClaim={dataClaimAndUser}
              form={form}
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
