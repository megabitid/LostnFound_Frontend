import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker, Form,
  Input, Modal,
  Select,
  Typography, Upload
} from "antd";
import axios from "axios";
import DataTable from "components/data-table";
import Sidebar from "components/sidebar";
import { Auth } from "modules/context";
import React, { useContext, useEffect, useState } from "react";

const { Title } = Typography;
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
  const [showInputModal, setShowInputModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
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


  // -- input modal content start --

  const inputModal = (isShow) => {
    setShowInputModal(isShow);
  };

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

  function submitForm() {
    alert("form submitted");
  }
  // -- input modal content end --


  // -- detail modal start

  const detailModal = (isShow) => {
    setShowDetailModal(isShow);
  };

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Barang Hilang</Title>
            <DataTable
              data={data}
              setData={setData}
              category={category}
              status={status}
              inputModal={inputModal}
              detailModal={detailModal}
              enableInput={true}
              lostPage={true}
            />
            {/* <InputModal
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
            /> */}

            {/* INPUT MODAL */}
            <Modal
              visible={showInputModal}
              title="Input Data Barang"
              style={{ top: 20 }}
              onCancel={() => setShowInputModal(false)}
              footer={[
                <Button key="back" onClick={() => setShowInputModal(false)}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading=""
                  onClick={submitForm}
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
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImg}
                    />
                  </Modal>
                </Form.Item>
              </Form>
            </Modal>

            {/* DETAIL/UPDATE MODAL */}
            <Modal
              visible={showDetailModal}
              title="Detail Data Barang"
              style={{ top: 20 }}
              onCancel={() => setShowDetailModal(false)}
              footer={[
                <Button key="back" onClick={() => setShowDetailModal(false)}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading=""
                  onClick={submitForm}
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
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImg}
                    />
                  </Modal>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        }
      />
    </div>
  );
}

export default Index;
