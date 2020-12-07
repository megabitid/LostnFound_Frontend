import { Typography } from "antd";
import axios from "axios";
import AdminTable from "components/admin-table";
import Sidebar from "components/sidebar";
import { API_URL, Auth } from "modules/context";
import React, { useContext, useState } from "react";

const { Title } = Typography;

function index(props) {

  const [users, setUsers] = useState([]);
  const [tableLoading, setTableLoading] = useState(false)

  const [user] = useContext(Auth);

    //  ----[ Filter is not working yet due to unavalaible API] ----

  function getUsers(filter = "") {
    setTableLoading(true)

    let config = {
      method: "get",
      url: `${API_URL}/web/users/${filter}`,
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios(config)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setTableLoading(false))
  }

  return (
    <div>
      <Sidebar
        content={
          <div>
            <Title>Data Admin</Title>
            <AdminTable
              data={users}
              getData={getUsers}
              isLoading={tableLoading}
            />
          </div>
        }
      />
    </div>
  );
}

export default index;
