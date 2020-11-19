import React from "react";
import swal from "sweetalert";
import deleteIcon from "../../assets/deleteIcon.png";
import {
  DeleteOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Popover,
  Select,
  Space,
  Table,
  Typography,
} from "antd";

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
  const content = (
    <Space direction="vertical">
      <Button type="text" icon={<FileSearchOutlined />} onClick={() => props.detailModal(true)}>
        Detail
      </Button>
      <Button type="text" icon={<DeleteOutlined />} onClick={deleteData}>
        Hapus
      </Button>
    </Space>
  );

  // table head
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nama barang",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tanggal kehilangan",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Lokasi kehilangan",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
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
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Text
          style={{ color: `${text === "Ditemukan" ? "#01AC13" : "#E24343"}` }}
        >
          {text}
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
            <Option value="bag-wallet">Tas & Dompet</Option>
            <Option value="other">Lain-lain</Option>
            <Option value="electronic">Elektronik</Option>
          </Select>
        </Space>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            props.inputModal(true);
          }}
        >
          Input data
        </Button>
      </Space>
      <Table columns={columns} dataSource={props.dataWithIndex} />
    </div>
  );
}
