import {
  CheckCircleOutlined, DeleteOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  SearchOutlined
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  notification,
  Popover,
  Select,
  Space,
  Table,
  Typography
} from "antd";
import React, { useContext } from "react";
import { Auth } from "../../modules/context";
import swal from "sweetalert";
import deleteIcon from "../../assets/deleteIcon.png";
import Axios from "axios";

const { Text } = Typography;
const { Option } = Select;

export default function Index(props) {

  // -- table content start --

  const [user] = useContext(Auth);

  // show particular photo from table
  const showPhoto = () => {
    alert("Showing Photo");
  };

  // delete function of table
  const deleteData = (value) => {
    swal({
      className: "alert-delete",
      icon: deleteIcon,
      title: "Hapus data dari tabel ?",
      text: "Setelah dihapus, data tersebut tidak akan muncul di dalam tabel",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Batal",
          value: false,
          visible: true,
          className: "cancel-button",
        },
        confirm: {
          text: "Hapus",
          value: true,
          visible: true,
        },
      },
    }).then((removeData) => {

      if (removeData) {
        let idBarang = value;
        let config = {
          method: 'delete',
          url: `https://megabit-lostnfound.herokuapp.com/api/v2/barang/${idBarang}`,
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        }
        Axios(config)
          .then((res) => {
            notification["success"]({
              message: "Berhasil menghapus data",
              description: res.message
            })
            let config = {
              method: 'get',
              url: (() => {
                if (props.lostPage) {
                  return "https://megabit-lostnfound.herokuapp.com/api/v2/barang";
                } else if (props.foundPage) {
                  return "https://megabit-lostnfound.herokuapp.com/api/v1/barang?status_id=2"
                }
              })(),
              headers: {
                'Authorization': `Bearer ${user.token}`,
              }
            }
            Axios(config)
              .then((res) => {
                let data = res.data.data;
                props.setData(data)
              }).catch((err) => {
                console.log(err);

              })
          })
          .catch((err) => {
            notification["error"]({
              message: "Gagal menghapus data",
              description: err.message
            })
          })
      } else {
        return;
      }
    })


  };


  // table head
  const parseStatus = _id => {
    let res = props.status.find(item => item.id === _id)
    return res?.nama
  }

  const parseCategory = _id => {
    let res = props.category.find(item => item.id === _id)
    return res?.nama
  }

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, object, index) => index + 1
    },
    {
      title: "Nama barang",
      dataIndex: "nama_barang",
      key: "nama_barang",
    },
    {
      title: "Tanggal kehilangan",
      dataIndex: "tanggal",
      key: "tanggal",
    },
    {
      title: "Lokasi kehilangan",
      dataIndex: "lokasi",
      key: "lokasi",
    },
    {
      title: "Kategori",
      dataIndex: "kategori_id",
      key: "kategori_id",
      render: (text) => (
        <Text>
          {parseCategory(text)}
        </Text>
      ),
    },
    {
      title: "Foto",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <Button
          type="link"
          style={{ textDecoration: "underline" }}
          onClick={showPhoto}
        >
          Lihat Foto
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status_id",
      key: "status_id",
      render: (text) => (
        <Text
          style={{
            color: (() => {
              if (text === 1) {
                return "#E24343";
              } else if (text === 2) {
                return "#01AC13";
              } else {
                return "#000"
              }
            })()
          }}
        >
          {parseStatus(text)}
        </Text>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Popover content={(
          <Space direction="vertical">
            {props.allowVerification ?
              <Button type="text" icon={<CheckCircleOutlined />} onClick={() => props.verificationModal(true)}>
                Verifikasi
              </Button>
              :
              <Button type="text" icon={<FileSearchOutlined />} onClick={() => props.detailModal(true)}>
                Detail
               </Button>
            }
            <Button type="text" icon={<DeleteOutlined />} onClick={() => deleteData(record.id)}>
              Hapus
        </Button>
          </Space>
        )}>
          <Button type="text" icon={<EllipsisOutlined />} />
        </Popover>
      ),
    },
  ];

  // -- table content end --

  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Space size="large">
          <Input
            size="large"
            placeholder="Cari di tabel"
            prefix={<SearchOutlined />}
          />
          <DatePicker size="large" placeholder="Pilih tanggal" />
          <Select size="large" placeholder="Kategori" style={{ width: 169 }}>
            {
              props.category.map(item => (
                <Option value={item.id} key={item.id}>{item.nama}</Option>
              ))
            }
          </Select>
        </Space>
        {
          props.enableInput && (
            <Button
              type="primary"
              size="large"
              onClick={() => {
                props.inputModal(true);
              }}
            >
              Input data
            </Button>
          )
        }
      </Space>
      <Table columns={columns} dataSource={props.data} />
    </div>
  );
}
