import React from "react"
import { Modal, Form, Input, Button } from "antd"
import { CloseOutlined } from "@ant-design/icons";

const VerificationModal = ({ showVerificationModal, setShowVerificationModal }) => {

    return (
        <Modal
            visible={showVerificationModal}
            centered="true"
            footer={null}
            onCancel={() => setShowVerificationModal(false)}
            width="350px"
            style={{ textAlign: "center" }}
        >
            <h2>Verifikasi klaim barang</h2>
            <Form
                layout="vertical"
                style={{ width: "300px", fontWeight: "500", marginTop: "30px" }}
            >
                <Form.Item
                    label="Nama Lengkap"
                    name="nama"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="No. Telpon"
                    name="telpon"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Alamat"
                    name="alamat"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Foto Tiket"
                    name="tiket"
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
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                )
                            });
                        }}
                    >
                        <img
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </Button>

                </Form.Item>
                <Form.Item
                    style={{ textAlign: "right", marginBottom: 0 }}
                >
                    <Button
                        onClick={() => setShowVerificationModal(false)}
                    >
                        Cancel
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        type="primary"
                    >
                        Verifikasi
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default VerificationModal;