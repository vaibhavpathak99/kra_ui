import React, { useEffect, useState } from "react";
import { Slider, Table } from "antd";
import axios from "axios";
function Tables() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/goldrate")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      children: [
        {
          title: "Metal",
          dataIndex: "product_name",
          key: "product_name",
          width: 50,
          align: "center",
          render: (text) => <>{text?.split(" ")[0]}</>,
        },
        {
          title: "Carat (gram)",
          dataIndex: "product_name",
          key: "product_name",
          width: 50,
          align: "center",
          render: (text) => (
            <>
              {text?.split(" ")[1]} {text?.split(" ")[2]}
            </>
          ),
        },

        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
          width: 50,
          align: "center",
        },
      ],
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} size="small" />
    </div>
  );
}

export default Tables;
