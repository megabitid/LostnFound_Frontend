import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Upload,
  Spin,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Auth, API_URL } from "modules/context";

const { Option } = Select;

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const Index = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [user] = useContext(Auth);
  const [stasiun, setStasiun] = useState([]);

  useEffect(() => {
    getStasiun();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  useImperativeHandle(ref, () => ({
    resetForm() {
      form.resetFields();
    },
  }));

  const uploadButton = (
    <div className="admin-upload">
      {props.loadingImg ? (
        <LoadingOutlined />
      ) : (
        <i class="ri-image-add-line font-size-2"></i>
      )}
    </div>
  );

  return (
    <div>
      <Modal
        visible={props.visible}
        title="Input Data Barang"
        style={{ top: 20 }}
        footer={null}
        onCancel={props.closeModal}
        className="admin-loader"
      >
        <Spin tip="Loading..." spinning={props.isLoading}>
          <Form form={form} layout="vertical" onFinish={props.submitForm}>
            <Form.Item label="Nama Admin" name={"nama"}>
              <Input placeholder="Nama Admin" />
            </Form.Item>
            <Form.Item label="NIP" name={"nip"}>
              <Input placeholder="NIP" />
            </Form.Item>
            <Form.Item label="Lokasi tugas" name={"stasiun_id"}>
              <Select
                size="default"
                placeholder="Ketik atau pilih lokasi stasiun"
                className="w-100"
              >
                {stasiun.map((data) => (
                  <Option value={data.id}>{data.nama}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Role" name={"role"}>
              <Select
                size="default"
                placeholder="Role"
                className="w-100"
              >
                <Option value={1}>Admin</Option>
                <Option value={2}>Super Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Foto">
              <Upload
                name="avatar"
                listType="picture-card"
                className={props.image && "avatar-uploader"}
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={props.imageHandler}
              >
                {props.image ? (
                  <img
                    src={props.image}
                    alt="avatar"
                    className="mt-5"
                    style={{ width: "30%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item className="mt-5">
              <Button
                type="primary"
                htmlType="submit"
                className="ml-1 float-right mt-3"
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={props.closeModal}
                className="float-right mt-3"
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
