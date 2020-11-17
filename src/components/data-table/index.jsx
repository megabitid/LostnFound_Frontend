import { DeleteOutlined, EllipsisOutlined, FileSearchOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Popover, Select, Space, Table, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;
const { Option } = Select;

export default function index() {

   // TO DO: button handler
   const showPhoto = () => {
      alert("Showing Photo")
   }

   const dataDetails = () => {
      alert("Detail")
   }

   const deleteData = () => {
      alert("Deleted")
   }

   const addData = () => {
      alert("Deleted")
   }


   // Table filter




   // Actions button content
   const content = (
      <Space direction="vertical">
         <Button type="text" icon={ <FileSearchOutlined /> } onClick={ dataDetails }>
            Detail
         </Button>
         <Button type="text" icon={ <DeleteOutlined /> } onClick={ deleteData }>
            Hapus
         </Button>
      </Space>
   )

   const columns = [
      {
         title: "No",
         dataIndex: "no",
         key: "no",
      },
      {
         title: 'Nama barang',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Tanggal kehilangan',
         dataIndex: 'date',
         key: 'date',
      },
      {
         title: 'Lokasi kehilangan',
         dataIndex: 'location',
         key: 'location',
      },
      {
         title: 'Kategori',
         dataIndex: 'category',
         key: 'category',
      },
      {
         title: 'Foto',
         dataIndex: 'photo',
         key: 'photo',
         render: text => (
            <Button type="link" style={ { textDecoration: "underline" } } onClick={ showPhoto }>
               Lihat Foto
            </Button>
         ),
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
         render: text => (
            <Text
               style={ { color: `${text === "Ditemukan" ? "#01AC13" : "#E24343"}` } }>
               {text }
            </Text>
         ),
      },
      {
         title: 'Action',
         dataIndex: 'id',
         key: 'id',
         render: (text, record) => (
            <Popover content={ content }>
               <Button type="text" icon={ <EllipsisOutlined /> } />
            </Popover>
         ),
      },
   ];

   const data = [
      {
         id: '1',
         name: 'Tas Supreme',
         date: '06 Nov 2020',
         location: 'Stasiun Gambir',
         category: 'Tas & Dompet',
         photo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
         status: "Ditemukan",
      },
      {
         id: '2',
         name: 'Dompet Montblanc',
         date: '06 Nov 2020',
         location: 'Stasiun Gambir',
         category: 'Tas & Dompet',
         photo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
         status: "Hilang",
      },
      {
         id: '3',
         name: 'Ransel Exsport',
         date: '05 Nov 2020',
         location: 'Stasiun Gambir',
         category: 'Tas & Dompet',
         photo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
         status: "Hilang",
      },
      {
         id: '4',
         name: 'Botol Tupperware',
         date: '05 Nov 2020',
         location: 'Stasiun Gambir',
         category: 'Lain-lain',
         photo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
         status: "Hilang",
      },
      {
         id: '5',
         name: 'Macbook Pro',
         date: '05 Nov 2020',
         location: 'Stasiun Gambir',
         category: 'Elektronik',
         photo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
         status: "Ditemukan",
      },
   ];

   const dataWithIndex = data.map((el, index) => ({ no: index + 1, ...el }))

   return (
      <div>
         <Space style={ { marginBottom: 16, width: "100%", justifyContent: "space-between" } }>
            <Space size="large">
               <Input size="large" placeholder="Cari di tabel" prefix={ <SearchOutlined /> } />
               <DatePicker size="large" placeholder="Pilih tanggal" />
               <Select size="large" placeholder="Kategori" style={{ width: 169 }}>
                  <Option value="bag-wallet">Tas & Dompet</Option>
                  <Option value="other">Lain-lain</Option>
                  <Option value="electronic">Elektronik</Option>
               </Select>
            </Space>
            <Button type="primary" size="large" onClick={ addData }>Input data</Button>
         </Space>
         <Table columns={ columns } dataSource={ dataWithIndex } />
      </div>
   )
}