import { Typography } from "antd";
import React from "react";
import DataTable from "../../components/data-table";
import Sidebar from "../../components/sidebar";
import swal from "sweetalert";
import deleteIcon from "../../assets/deleteIcon.png";
const { Title } = Typography;

function index(props) {

  const showPhoto = () => {
    alert("Showing Photo");
  };

  const dataDetails = () => {
    alert("Detail");
  };

  const deleteData = () => {
    swal({
      className: "alert-delete",
      icon: deleteIcon,
      title: "Hapus data dari tabel ?",
      text: "Setelah dihapus, data tersebut tidak akan muncul di dalam tabel",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Batal",
          visible: true,
          className: "cancel-button",
        },
        confirm: {
          text: "Hapus",
          value: true,
          visible: true,
        },
      },
    });
  };

  function test(){
    console.log('tes')
  }

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
  console.log(props.isShowModal)
  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Barang Ditemukan</Title>
            <DataTable dataWithIndex={dataWithIndex} />
          </div>
        }
      />
    </div>
  );
}

export default index;
