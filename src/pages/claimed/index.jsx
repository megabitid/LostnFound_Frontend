import React, { useState } from "react";
import { Typography } from "antd";
import DataTable from "../../components/data-table";
import Sidebar from "../../components/sidebar";
import InputModal from "../../components/input-modal";
import UpdateModal from "../../components/update-modal";
const { Title } = Typography;

function Index(props) {
  const [showInputModal, setShowInputModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

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

  const data = [
    {
      id: "1",
      name: "Tas Supreme",
      date: "06 Nov 2020",
      location: "Stasiun Gambir",
      category: "Tas & Dompet",
      photo:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      status: "Ditemukan",
    },
    {
      id: "2",
      name: "Dompet Montblanc",
      date: "06 Nov 2020",
      location: "Stasiun Gambir",
      category: "Tas & Dompet",
      photo:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      status: "Hilang",
    },
    {
      id: "3",
      name: "Ransel Exsport",
      date: "05 Nov 2020",
      location: "Stasiun Gambir",
      category: "Tas & Dompet",
      photo:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      status: "Hilang",
    },
    {
      id: "4",
      name: "Botol Tupperware",
      date: "05 Nov 2020",
      location: "Stasiun Gambir",
      category: "Lain-lain",
      photo:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      status: "Hilang",
    },
    {
      id: "5",
      name: "Macbook Pro",
      date: "05 Nov 2020",
      location: "Stasiun Gambir",
      category: "Elektronik",
      photo:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      status: "Ditemukan",
    },
  ];

  const dataWithIndex = data.map((el, index) => ({ no: index + 1, ...el }));

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
            <Title>Barang Diklaim</Title>
            <DataTable
              dataWithIndex={dataWithIndex}
              inputModal={() => setShowInputModal(true)}
              detailModal={detailModal}
            />
            <InputModal
              modalData={fileList}
              visible={showInputModal}
              visibleHandler={showModal}
              fileListHandler={(value) => setFileList(value)}
              submitForm={submitForm}
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
