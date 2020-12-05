import React, { useState, useEffect, useContext, forwardRef } from "react";
import axios from "axios";
import moment from "moment";
import { Auth, API_URL } from "../../modules/context";
import { PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Spin,
} from "antd";

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const Index = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [user] = useContext(Auth);
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [stasiun, setStasiun] = useState(undefined);
  const [kategori, setKategori] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [statuses, setStatuses] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    if (props.id !== undefined) {
      props.loadingHandler(true);
      getData();
      getStatuses();
      getImagesData();
    }
  }, [props.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function getData() {
    let config = {
      method: "get",
      url: `${API_URL}/barang/${props.id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setData(res.data);
        getStasiun(res.data);
        getStatus(res.data);
        getKategori(res.data);
        props.loadingHandler(false);
      })
      .catch((err) => console.log(err));
  }

  function getImagesData() {
    let config = {
      method: "get",
      url: `${API_URL}/barang-images?barang_id=${props.id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        let datas = res.data.data;
        let imagesData = datas.map((data) => ({
          uid: data.id,
          name: data.nama,
          url: data.uri,
        }));
        setImages(imagesData);
        props.loadingHandler(false);
      })
      .catch((err) => console.log(err));
  }

  function getStasiun(res) {
    let config = {
      method: "get",
      url: `${API_URL}/stasiun/${res.stasiun_id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setStasiun(res.data.nama);
      })
      .catch((err) => console.log(err));
  }

  function getKategori(res) {
    let config = {
      method: "get",
      url: `${API_URL}/barang-kategori/${res.kategori_id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setKategori(res.data.nama);
      })
      .catch((err) => console.log(err));
  }

  function getStatus(res) {
    let config = {
      method: "get",
      url: `${API_URL}/barang-status/${res.status_id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setStatus(res.data.id);
      })
      .catch((err) => console.log(err));
  }

  function getStatuses() {
    let config = {
      method: "get",
      url: `${API_URL}/barang-status`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setStatuses(res.data.data);
      })
      .catch((err) => console.log(err));
  }

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

  function changeStatus(key) {
    let datas = data;
    datas.status_id = key;
    setData(datas);
    setStatus(key);
  }
  return (
    <div>
      <Modal
        visible={props.visible}
        title="Detail Barang"
        style={{ top: 20 }}
        footer={false}
        onCancel={() => props.visibleHandler(false)}
      >
        <Spin tip="Loading..." spinning={props.isLoading}>
          <Form
            form={form}
            layout="vertical"
            onValuesChange={(x) => console.log(x)}
          >
            <Form.Item label="Nama Barang">
              <Input disabled={true} value={data && data.nama_barang} />
            </Form.Item>
            <Form.Item label="Tanggal Kehilangan">
              <DatePicker
                disabled={true}
                size="default"
                value={data && moment(data.tanggal)}
                className="w-100"
              />
            </Form.Item>
            <Form.Item label="Lokasi">
              <Input
                placeholder="Lokasi"
                disabled={true}
                value={data && data.lokasi}
              />
            </Form.Item>
            <Form.Item label="Stasiun">
              <Select
                size="default"
                placeholder="Stasiun"
                className="w-100"
                disabled={true}
                value={stasiun}
              ></Select>
            </Form.Item>
            <Form.Item label="Kategori Barang">
              <Select
                size="default"
                disabled={true}
                placeholder="Kategori Barang"
                className="w-100"
                value={kategori}
              ></Select>
            </Form.Item>
            <Form.Item label="Status">
              <Select
                size="default"
                placeholder="Status"
                className="w-100"
                value={status}
                onChange={changeStatus}
              >
                {statuses.map((data) => (
                  <Option value={data.id}>{data.nama}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Deskripsi">
              <Input.TextArea
                placeholder="Deskripsi"
                disabled={true}
                value={data && data.deskripsi}
              />
            </Form.Item>
            <span className="optional-text">*Optional</span>
            <Form.Item label="Foto">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={images}
                onPreview={handlePreview}
                onChange={handleChange}
                disabled={true}
              >
                {props.modalData.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img alt="example" className="w-100" src={previewImg} />
              </Modal>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="ml-1 float-right"
                onClick={() => props.submitUpdateForm(data)}
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={() => props.visibleHandler(false)}
                className="float-right"
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
});

export default Index;
