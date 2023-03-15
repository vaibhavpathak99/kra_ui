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
        // let abc = []
        // let flag;
        // const data = res.data;
        // let sales_price = "";
        // let purchase_price = ""
        // data.map((aa) => {
        //   if (aa.rate_type === "sale") {
        //     flag = true
        //   }
        //   else if (aa.rate_type === "purchase") {
        //     flag = false
        //   }
        //   else {

        //   }
        //   if (flag == true) {
        //     sales_price = aa.amount

        //   }
        //   else if (flag == false) {
        //     purchase_price = aa.amount

        //   }
        //   else {

        //   }


        //   abc.push(
        //     {
        //       "product_name": aa.product_name,
        //       "sale_price": sales_price,
        //       "purchase_price": purchase_price,
        //       // "amount":aa.amount
        //     }
        //   )

        // })
        
        // let unique = [...new Set(abc)];
        // // console.warn(abc)
        // console.warn("unique data", unique)

        // setData(unique)
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
          // width: 50,
          align: "center",
          render: (text) => <>{text?.split(" ")[0]}</>,
        },
        {
          title: "Carat (gram)",
          dataIndex: "product_name",
          key: "product_name",
          // width: 50,
          align: "center",
          render: (text, record) => (
            <>
              { record.product_name=="Silver 0"?"Article":record.product_name=="silver 100"?"Bar":text?.split(" ")[1]} {text?.split(" ")[2]}
             </>
          ),
        },

        {
          title: "Amount",
          // width: 10,
          align: "center",
          children: [
            {
              title: "Sales",
              dataIndex: "sale_amount",
              key: "sale_amount",
              // width: 10,
              align: "center",
              render:(text,record)=>(<>{"₹"} {text}</>)
              
            },
            {
              title: "Purchase",
              dataIndex: "purchase_amount",
              key: "purchase_amount",
              // width: 10,
              align: "center",
              render:(text,record)=>(<>{"₹"}{text}</>)
            }

          ]
          
        },
      ],
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={[...new Set(data)]} size="small" bordered/>
    </div>
  );
}

export default Tables;
