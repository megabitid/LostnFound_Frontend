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
  Popover,
  Select,
  Space,
  Table,
  Typography
} from "antd";
import React from "react";
import swal from "sweetalert";
import deleteIcon from "../../assets/deleteIcon.png";

const { Text } = Typography;
const { Option } = Select;

export default function Index(props) {

  // -- table content start --

  // show particular photo from table
  const showPhoto = () => {
    alert("Showing Photo");
  };

  // delete function of table
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

  // action section of table

  const verification = (
    <Button type="text" icon={<CheckCircleOutlined />} onClick={() => props.verificationModal(true)}>
        Verifikasi
    </Button>
  )

  const detail = (
    <Button type="text" icon={<FileSearchOutlined />} onClick={() => props.detailModal(true)}>
        Detail
    </Button>
  )

  const content = (
    <Space direction="vertical">
      {props.allowVerification ? verification : detail }
      <Button type="text" icon={<DeleteOutlined />} onClick={deleteData}>
        Hapus
      </Button>
    </Space>
  );

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
          style={{ color: (() => {
            if (text === 1) {
              return "#E24343";
            } else if (text === 2) {
              return "#01AC13";
            } else {
              return "#000"
            }
          })()}}
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
        <Popover content={content}>
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
      <Table columns={columns} dataSource={props.dataWithIndex} />
    </div>
  );
}
