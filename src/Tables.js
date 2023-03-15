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
        let abc = []
        let flag;
        const data = res.data;
        let sales_price = "";
        let purchase_price = ""
        data.map((aa) => {
          if (aa.rate_type === "sale") {
            flag = true
          }
          else if (aa.rate_type === "purchase") {
            flag = false
          }
          else {

          }
          if (flag == true) {
            sales_price = aa.amount

          }
          else if (flag == false) {
            purchase_price = aa.amount

          }
          else {

          }


          abc.push(
            {
              "product_name": aa.product_name,
              "sale_price": sales_price,
              "purchase_price": purchase_price,
              // "amount":aa.amount
            }
          )

        })
        
        let unique = [...new Set(abc)];
        // console.warn(abc)
        console.warn("unique data", unique)

        setData(unique)
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
          render: (text, record) => (
            <>
              { }
              {text?.split(" ")[1]} {text?.split(" ")[2]}
            </>
          ),
        },

        {
          title: "Amount",
          children: [
            {
              title: "Sales",
              dataIndex: "sale_price",
              key: "sale_price",
              width: 50,
              align: "center",
              // render: (text, record) => (
              //   <>
              //     {record.rate_type === "purchase" ? record.amount : ""}
              //   </>
              // )
            },
            {
              title: "Purchase",
              dataIndex: "purchase_price",
              key: "purchase_price",
              width: 50,
              // align: "center",
              // render: (text, record) => (
              //   <>
              //     {record.rate_type === "sale" ? record.amount : ""}
              //   </>
              // )
            }

          ]
          // dataIndex: "amount",
          // key: "amount",
          // width: 50,
          // align: "center",
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
