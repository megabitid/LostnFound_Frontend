import React, { useState } from "react";
import swal from "sweetalert";
import deleteIcon from "../../assets/deleteIcon.png";
import {
  DeleteOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Form,
  Modal,
  Button,
  DatePicker,
  Input,
  Popover,
  Select,
  Space,
  Upload,
  Table,
  Typography,
} from "antd";

const { Text } = Typography;
const { Option } = Select;

// function for show/preview image uploaded
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function Index(props) {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
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

  // -- table content start --

  // show particular photo from table
  const showPhoto = () => {
    alert("Showing Photo");
  };

  // show data detail from table
  const dataDetails = () => {
    alert("Detail");
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
      <Button type="text" icon={<FileSearchOutlined />} onClick={dataDetails}>
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

  // -- input modal content start --
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImg(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // input modal content end

  function submitForm() {
    alert("form submitted");
  }

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
        <Button type="primary" size="large" onClick={() => setShowModal(true)}>
          Input data
        </Button>
      </Space>
      <Table columns={columns} dataSource={props.dataWithIndex}/>

      {/* INPUT MODAL */}
      <Modal
        visible={showModal}
        title="Input Data Barang"
        style={{ top: 20 }}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="back" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading="" onClick={submitForm}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Nama Barang">
            <Input placeholder="Nama Barang" />
          </Form.Item>
          <Form.Item label="Tanggal Kehilangan">
            <DatePicker
              size="default"
              placeholder="Tanggal Kehilangan"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Lokasi Kehilangan">
            <Select
              size="default"
              placeholder="Lokasi Kehilangan"
              style={{ width: "100%" }}
            >
              <Option value="bag-wallet">Stasiun A</Option>
              <Option value="other">Stasiun B</Option>
              <Option value="electronic">Stasiun C</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Kategori Barang">
            <Select
              size="default"
              placeholder="Kategori Barang"
              style={{ width: "100%" }}
            >
              <Option value="bag-wallet">Kategori A</Option>
              <Option value="other">Kategori B</Option>
              <Option value="electronic">Kategori C</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Stasus">
            <Select
              size="default"
              placeholder="Stasus"
              style={{ width: "100%" }}
            >
              <Option value="bag-wallet">Status A</Option>
              <Option value="other">Status B</Option>
              <Option value="electronic">Status C</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Deskripsi">
            <Input.TextArea placeholder="Deskripsi" />
          </Form.Item>
          <span className="optional-text">*Optional</span>
          <Form.Item label="Foto">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImg} />
            </Modal>
          </Form.Item>
        </Form>
      </Modal>

      
    </div>
  );
}
