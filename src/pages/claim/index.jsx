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
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [data, setData] = useState([])
  const [category, setCategory] = useState([])
  const [status, setStatus] = useState([])

  const [user] = useContext(Auth);

  // -- table data start --

  const [fileList, setFileList] = useState([
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

  function getCategory() {
    let config = {
      method: 'get',
      url: 'https://megabit-lostnfound.herokuapp.com/api/v1/barang-kategori',
      headers: { 'Authorization': `Bearer ${user.token}` }
    };

    axios(config)
      .then((res) => {
        setCategory(res.data.data)
      })
      .catch((err) => console.log(err));
  }

  function getStatus() {
    let config = {
      method: 'get',
      url: 'https://megabit-lostnfound.herokuapp.com/api/v1/barang-status',
      headers: { 'Authorization': `Bearer ${user.token}` }
    };

    axios(config)
      .then((res) => {
        setStatus(res.data.data)
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getData()
    getCategory()
    getStatus()
  }, [])

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
              data={data}
              setData={setData}
              category={category}
              status={status}
              detailModal={detailModal}
              verificationModal={verificationModal}
              allowVerification={true}
            />
            <VerificationModal
              showVerificationModal={showVerificationModal}
              setShowVerificationModal={verificationModal}
            />
            <UpdateModal
              modalData={fileList}
              visible={showDetailModal}
              visibleHandler={detailModal}
              fileListHandler={(value) => setFileList(value)}
              submitUpdateForm={submitUpdateForm}
            />
          </div>
        }
      />
    </div>
  );
}

export default Index;
