import { Typography } from "antd";
import axios from "axios";
import DataTable from "components/data-table";
import Sidebar from "components/sidebar";
import UpdateModal from "components/update-modal";
import VerificationModal from "components/verification-modal";
import { Auth } from "modules/context";
import React, { useContext, useEffect, useState } from "react";

const { Title } = Typography;

function Index(props) {
  const [user] = useContext(Auth);
  const [data, setData] = useState([])
  const [images, setImages] = useState([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);


  // -- table data start --

  useEffect(() => {
    getData()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  function getData() {
    let config = {
      method: 'get',
      url: 'https://megabit-lostnfound.herokuapp.com/api/v1/barang',
      headers: { 'Authorization': `Bearer ${user.token}` }
    };

    axios(config)
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => console.log(err));
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

  // -- verification modal
  const verificationModal = (isShow) => {
    setShowVerificationModal(isShow);
  };

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Permintaan Klaim</Title>
            <DataTable
              dataWithIndex={dataWithIndex}
              detailModal={detailModal}
              verificationModal={verificationModal}
              allowVerification={true}
            />
            <VerificationModal
              showVerificationModal={showVerificationModal}
              setShowVerificationModal={verificationModal}
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
