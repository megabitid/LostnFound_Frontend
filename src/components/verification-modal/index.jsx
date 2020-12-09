import React, { useContext } from "react"
import { Modal, Form, Input, Button, notification } from "antd"
import { Auth } from "modules/context";
import Axios from "axios";
import { CloseOutlined } from "@ant-design/icons";


const VerificationModal = ({ showVerificationModal, setShowVerificationModal, dataClaim, form, getData }) => {
    const [user] = useContext(Auth);
    console.log(dataClaim);

    const onVerification = () => {
        let config = {
            method: 'put',
            url: `https://megabit-lostnfound.herokuapp.com/api/v1/claims/${dataClaim.id}/verified`,
            headers: { 'Authorization': `Bearer ${user.token}` },
            data: { verified: 1 }
        };
        Axios(config)
            .then((res) => {
                notification["success"]({
                    message: "Berhasil memverifikasi data",
                    description: res.message,
                });
                console.log(res);
                getData()
            })
            .catch((err) => {
                console.log(err)
                notification["error"]({
                    message: "Gagal menghapus data",
                    description: err.message,
                });
            })
        setShowVerificationModal(false)
        form.resetFields()
    }

    return (
        <Modal
            visible={showVerificationModal}
            title="Verifikasi klaim barang"
            centered="true"
            footer={null}
            onCancel={() => {
                setShowVerificationModal(false)
                form.resetFields()
            }}
            width="350px"
            style={{ textAlign: "center" }}
        >
            <Form
                layout="vertical"
                style={{ width: "300px", fontWeight: "500", marginTop: "30px" }}
                form={form}
            >
                <Form.Item
                    label="Nama Lengkap"
                    name="nama"
                >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    label="No. Telpon"
                    name="no_telp"
                >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    label="Alamat"
                    name="alamat"
                >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    label="Foto Tiket"
                    name="uri_tiket"
                >
                    <Button
                        type="text"
                        style={{ height: "auto" }}
                        onClick={() => {
                            Modal.info({
                                icon: null,
                                width: "500px",
                                centered: "true",
                                maskClosable: "true",
                                okText: <CloseOutlined style={{ color: "white" }} />,
                                okType: "text",
                                okButtonProps: { style: { position: "absolute", top: -25, right: -30 } },
                                content: (
                                    <img
                                        width="100%"
                                        src={dataClaim.uri_tiket}
                                        alt="Foto Tiket"
                                    />
                                )
                            });
                        }}
                    >
                        <img
                            width={100}
                            src={dataClaim.uri_tiket}
                            alt="Foto Tiket"
                        />
                    </Button>

                </Form.Item>
                <Form.Item
                    style={{ textAlign: "right", marginBottom: 0 }}
                >
                    <Button
                        onClick={() => {
                            setShowVerificationModal(false)
                            form.resetFields()
                        }}
                    >
                        Cancel
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        onClick={onVerification}
                        type="primary"
                    >
                        Verifikasi
                    </Button>
                </Form.Item>

            </Form>
        </Modal >
    )
}

export default VerificationModal;