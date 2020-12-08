import {
  DeleteOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popover, Select, Space, Table, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";

const { Text } = Typography;
const { Option } = Select;

export default function Index(props) {
  const [filter, setFilter] = useState({ query: "", role: "" });
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // -- Effect --
  useEffect(() => {
    //  ----[ Filter is not working yet due to unavalaible API] ----
    props.getData();
    // props.getData(`&kategori_id=${filter.role}&search=${filter.query}&`)
  }, [filter]);

  // -- table content start --

  // Filter by role handler
  const handleFilterRole = (value) => {
    // props.getData(`&kategori_id=${value}`)
    setFilter((prevState) => ({ ...prevState, role: value }));
  };

  const clearFilterRole = () => {
    // props.getData(`&kategori_id=${value}`)
    setFilter((prevState) => ({ ...prevState, role: "" }));
  };

  // Filter by user query
  const handleFilterQuery = (e) => {
    // props.getData(`&search=${e.target.value}`)
    setFilter((prevState) => ({ ...prevState, query: e.target.value }));
  };

  // show particular photo from table
  const showPhoto = (image_url) => {
    setImageUrl(image_url);
    setPreviewTitle(image_url.substring(image_url.lastIndexOf("/") + 1));
    setPreviewVisible(true);
  };

  // delete function of table

  // table head
  const parseRole = (_id) => {
    if (_id === 1) {
      return "Admin";
    } else if (_id === 2) {
      return "Super admin";
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, object, index) => index + 1,
    },
    {
      title: "Nama admin",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "NIP",
      dataIndex: "nip",
      key: "nip",
    },
    {
      title: "Lokasi tugas",
      dataIndex: "lokasi",
      key: "lokasi",
      //  ----[ Lokasi tugas is not info is not avalaible from API] ----
      render: () => <Text>Unavailable</Text>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <Text>{parseRole(text)}</Text>,
    },
    {
      title: "Foto",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Button
          type="link"
          style={{ textDecoration: "underline" }}
          onClick={() => showPhoto(text)}
        >
          Lihat Foto
        </Button>
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
                icon={<FileSearchOutlined />}
                onClick={() => props.detailModal(true, record.id)}
              >
                Detail
              </Button>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                //  onClick={() => deleteData(record.id)}
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

  console.log(props.data);

  return (
    <div>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="user" style={{ width: "100%" }} src={imageUrl} />
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
            placeholder="Role"
            style={{ width: 169 }}
            onSelect={handleFilterRole}
            onClear={clearFilterRole}
            allowClear
          >
            <Option value={1} key={1}>
              Admin
            </Option>
            <Option value={2} key={2}>
              Super Admin
            </Option>
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
      <Table
        columns={columns}
        dataSource={props.data}
        loading={props.isLoading}
      />
    </div>
  );
}
