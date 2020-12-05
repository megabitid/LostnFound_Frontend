import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";
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
import { Auth, API_URL } from "modules/context";

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
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [stasiun, setStasiun] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    getCategory();
    getStatuses();
    getStasiun();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getCategory() {
    let config = {
      method: "get",
      url: `${API_URL}/barang-kategori`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setCategory(res.data.data);
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
        setStatus(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  function getStasiun() {
    let config = {
      method: "get",
      url: `${API_URL}/stasiun`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setStasiun(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  const handleChange = ({ fileList }) => {
    props.imagesHandler(fileList);
  };

  const handlePreview = async (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImg(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  useImperativeHandle(ref, () => ({
    resetForm() {
      form.resetFields();
    },
  }));

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
        title="Input Data Barang"
        style={{ top: 20 }}
        footer={null}
        onCancel={() => props.visibleHandler(false)}
      >
        <Spin tip="Loading..." spinning={props.isLoading}>
          <Form form={form} layout="vertical" onFinish={props.submitForm}>
            <Form.Item label="Nama Barang" name={"nama_barang"}>
              <Input placeholder="Nama Barang" />
            </Form.Item>

            <Form.Item label="Tanggal Kehilangan" name={"tanggal"}>
              <DatePicker
                size="default"
                placeholder="Tanggal Kehilangan"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Lokasi" name={"lokasi"}>
              <Input placeholder="Lokasi" />
            </Form.Item>
            <Form.Item label="Stasiun" name={"stasiun_id"}>
              <Select
                size="default"
                placeholder="Stasiun"
                style={{ width: "100%" }}
              >
                {stasiun.map((data) => (
                  <Option value={data.id}>{data.nama}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Kategori Barang" name={"kategori_id"}>
              <Select
                size="default"
                placeholder="Kategori Barang"
                style={{ width: "100%" }}
              >
                {category.map((data) => (
                  <Option value={data.id}>{data.nama}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Stasus" name="status_id">
              <Select
                size="default"
                placeholder="Stasus"
                style={{ width: "100%" }}
              >
                {status.map((data) => (
                  <Option value={data.id}>{data.nama}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Deskripsi" name={"deskripsi"}>
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
                onCancel={() => setPreviewVisible(false)}
              >
                <img alt="example" style={{ width: "100%" }} src={previewImg} />
              </Modal>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="ml-1 float-right"
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
