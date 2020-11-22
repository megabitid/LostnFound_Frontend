import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function Index(props) {
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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

  const handleChange = ({ fileList }) => props.fileListHandler(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Modal
        visible={props.visible}
        title="Detail Barang"
        style={{ top: 20 }}
        onCancel={() => props.visibleHandler(false)}
        footer={[
          <Button key="back" onClick={() => props.visibleHandler(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading=""
            onClick={props.submitForm}
          >
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
              fileList={props.modalData}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {props.modalData.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={() => props.visibleHandler(false)}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImg} />
            </Modal>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Index;
