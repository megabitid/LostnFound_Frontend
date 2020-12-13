import {
  CheckCircleOutlined,
  DeleteOutlined,
  EllipsisOutlined,

  SearchOutlined
} from "@ant-design/icons";
import {
  Button,

  Input,
  notification,
  Popover,
  Select,
  Space,
  Table,
  Typography
} from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import { Auth } from "modules/context";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import deleteIcon from "../../assets/deleteIcon.png";

const { Text } = Typography;
const { Option } = Select;

export default function Index(props) {
  const [filter, setFilter] = useState({ query: "", status: "" })
  const [user] = useContext(Auth);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("")

  // -- Effect --
  useEffect(() => {
    props.getData(`&verified=${filter.status}&search=${filter.query}&`)
  }, [filter])

  // -- table content start --

  // Filter by status handler
  const handleFilterStatus = value => {
    // props.getData(`&kategori_id=${value}`
    setFilter(prevState => ({ ...prevState, status: value }))
  }

  const clearFilterStatus = () => {
    // props.getData(`&kategori_id=${value}`)
    setFilter(prevState => ({ ...prevState, status: "" }))
  }

  // Filter by user query
  const handleFilterQuery = e => {
    // props.getData(`&search=${e.target.value}`)
    setFilter(prevState => ({ ...prevState, query: e.target.value }))
  }

  // show particular photo from table
  const showPhoto = uri_tiket => {
    setImageUrl(uri_tiket);
    setPreviewVisible(true)
  };

  // delete function of table
  const deleteData = (value) => {
    swal({
      className: "alert-delete",
      icon: deleteIcon,
      title: "Hapus data dari tabel ?",
      text: "Setelah dihapus, data tersebut tidak akan muncul di dalam tabel",
      dangerMode: true,
      buttons: ["Batal", "Hapus"],
    }).then((removeData) => {
      if (removeData) {
        let id = value;
        props.loadingHandler(true);

        let config = {
          method: "delete",
          url: `https://megabit-lostnfound.herokuapp.com/api/v1/claims/${id}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        axios(config)
          .then((res) => {
            notification["success"]({
              message: "Berhasil menghapus data",
              description: res.message,
            });
            props.getData();
            props.loadingHandler(true);
          })
          .catch((err) => {
            notification["error"]({
              message: "Gagal menghapus data",
              description: err.message,
            });
          });
      } else {
        return;
      }
    });
  };

  // table head

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, object, index) => index + 1,
    },
    {
      title: "Nama barang",
      dataIndex: "barang",
      key: "barang",
      render: (text) => text.nama_barang,
    },
    {
      title: "Nomor telepon",
      dataIndex: "no_telp",
      key: "no_telp",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "Tiket",
      dataIndex: "uri_tiket",
      key: "uri_tiket",
      render: (text) => (
        <Button
          type="link"
          style={{ textDecoration: "underline" }}
          onClick={() => showPhoto(text)}
        >
          Lihat Tiket
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "verified",
      key: "verified",
      render: (text) => (
        <Text
          style={{
            color: (() => {
              if (text) {
                return "#01AC13";
              } else {
                return "#E24343";
              }
            })(),
          }}
        >
          {text ? "Terverifikasi" : "Belum terverifikasi"}
        </Text>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Popover
          content={
            <Space direction="vertical">
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                onClick={() => props.verificationModal(record)}
              >
                Verifikasi
               </Button>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => deleteData(record.id)}
              >
                Hapus
               </Button>
            </Space>
          }
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Popover>
      ),
    },
  ];

  // -- table content end --

  return (
    <div>
      <Modal
        visible={previewVisible}
        // title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="user" className="w-100" src={imageUrl} />
      </Modal>
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Space size="large">
          <Input
            allowClear
            size="large"
            placeholder="Cari di tabel"
            prefix={<SearchOutlined />}
            onChange={handleFilterQuery}
          />
          <Select
            size="large"
            placeholder="Kategori"
            style={{ width: 169 }}
            onSelect={handleFilterStatus}
            onClear={clearFilterStatus}
            allowClear
          >
            <Option value={true} key={1}>Terverifikasi</Option>
            <Option value={false} key={2}>Belum terverifikasi</Option>
          </Select>
        </Space>
        {props.enableInput && (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              props.inputModal(true);
            }}
          >
            Input data
          </Button>
        )}
      </Space>
      <Table
        columns={columns}
        dataSource={props.data}
        loading={props.isLoading}
        style={{boxShadow: "0px 10px 30px rgba(0, 9, 44, 0.1)"}}
      />
    </div>
  );
}