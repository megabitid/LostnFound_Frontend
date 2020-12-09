import {
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  SearchOutlined
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  notification,
  Popover,
  Select,
  Space,
  Table,
  Typography
} from "antd";
import axios from "axios";
import { API_URL, Auth } from "modules/context";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import deleteIcon from "../../assets/deleteIcon.png";

const { Text } = Typography;
const { Option } = Select;

export default function Index(props) {
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [filter, setFilter] = useState({ query: "", category: "" })
  const [user] = useContext(Auth);

  // -- Effect --
  useEffect(() => {
    getCategory();
    getStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    props.getData(`&kategori_id=${filter.category}&search=${filter.query}&`)
  }, [filter])

  // -- API Call --
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

  function getStatus() {
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


  // -- table content start --

  // Filter by category handler
  const handleFilterCategory = value => {
    // props.getData(`&kategori_id=${value}`
    setFilter(prevState => ({ ...prevState, category: value }))
  }

  const clearFilterCategory = () => {
    // props.getData(`&kategori_id=${value}`)
    setFilter(prevState => ({ ...prevState, category: "" }))
  }

  // Filter by user query
  const handleFilterQuery = e => {
    // props.getData(`&search=${e.target.value}`)
    setFilter(prevState => ({ ...prevState, query: e.target.value }))
  }

  // show particular photo from table
  const showPhoto = (id_Barang) => {
    console.log(id_Barang);
    let config = {
      method: "get",
      url: `${API_URL}/barang-images?barang_id=${id_Barang}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        let dataImage = res.data.data;

        const settings = {
          dots: true,
          fade: true,
          infinte: true,
          speed: 500,
          slidesToShow: 1,
          arrows: true,
          slidesToScroll: 1,
          className: "slides"
        }

        Modal.info({
          icon: null,
          width: "500px",
          centered: "true",
          maskClosable: "true",
          okText: <CloseOutlined style={{ color: "white" }} />,
          okType: "text",
          okButtonProps: { style: { position: "absolute", top: -25, right: -30 } },
          content: (
            <Slider {...settings}>
              {dataImage.map((photo) =>
                <div>
                  <img width="100%" src={photo.uri} alt="" />
                </div>
              )}
            </Slider>
          )
        });


      })
      .catch((err) => {
        console.log(err)
        notification["error"]({
          description: "Gambar tidak terdeteksi"
        })
      });
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
        props.loadingHandler(true)
        let idBarang = value;

        let config = {
          method: "delete",
          url: `${API_URL}/barang/${idBarang}`,
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
            props.loadingHandler(false)

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
  const parseStatus = (_id) => {
    let res = status.find((item) => item.id === _id);
    return res?.nama;
  };

  const parseCategory = (_id) => {
    let res = category.find((item) => item.id === _id);
    return res?.nama;
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, object, index) => index + 1,
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
      render: (text) => <Text>{parseCategory(text)}</Text>,
    },
    {
      title: "Foto",
      dataIndex: "id",
      key: "id",
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
      title: "Status",
      dataIndex: "status_id",
      key: "status_id",
      render: (text) => (
        <Text
          style={{
            color: (() => {
              if (text === 1) {
                return "#E24343";
              } else if (text === 2) {
                return "#01AC13";
              } else if (text === 4) {
                return "#1B68B1"
              } else {
                return "#000";
              }
            })(),
          }}
        >
          {parseStatus(text)}
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
              {props.allowVerification ? (
                <Button
                  type="text"
                  icon={<CheckCircleOutlined />}
                  onClick={() => props.verificationModal(true)}
                >
                  Verifikasi
                </Button>
              ) : (
                  <Button
                    type="text"
                    icon={<FileSearchOutlined />}
                    onClick={() => props.detailModal(true, record.id)}
                  >
                    Detail
                  </Button>
                )}
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
          <DatePicker size="large" placeholder="Pilih tanggal" />
          <Select
            size="large"
            placeholder="Kategori"
            style={{ width: 169 }}
            onSelect={handleFilterCategory}
            onClear={clearFilterCategory}
            allowClear
          >
            {category.map((_category) => (
              <Option value={_category.id} key={_category.id}>
                {_category.nama}
              </Option>
            ))}
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
      <Table columns={columns} dataSource={props.data} loading={props.isLoading} />
    </div>
  );
}
