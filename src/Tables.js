import React, { useEffect, useState } from "react";
import useInterval from "use-interval";
import { Slider, Table } from "antd";
import axios from "axios";
function Tables() {
  const [data, setData] = useState([]);

  function getdata(){
    axios
      .get("/goldrate")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getdata();
  }, []);

    useInterval(() => {
      getdata();
  }, 900000);

  function addZeroes(num) {
    // Cast as number
    var num = Number(num);
    // If not a number, return 0
    if (isNaN(num)) {
        return 0;
    }
    // If there is no decimal, or the decimal is less than 2 digits, toFixed
    if (String(num).split(".").length < 2 || String(num).split(".")[1].length<=2 ){
        num = num.toFixed(2);
    }
    // Return the number
    return num;
}

const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
  const columns = [
    {
      children: [
        {
          title: "Metal",
          dataIndex: "product_name",
          key: "product_name",
          // width: 50,
          align: "center",
          render: (text) => <>{capitalizeWords(text?.split(" ")[0])}</>,
        },
        {
          title: "Carat (gram)",
          dataIndex: "product_name",
          key: "product_name",
          // width: 50,
          align: "center",
          render: (text, record) => (
            <>
              { record.product_name=="Silver 0"?"Article":record.product_name=="silver 100"?"Bar":<>{text?.split(" ")[1]} KT</>}
             </>
          ),
        },

        {
          title: "Rate",
          // width: 10,
          align: "center",
          children: [
            {
              title: "Sale",
              dataIndex: "sale_amount",
              key: "sale_amount",
              // width: 10,
              align: "center",
              render:(text,record)=>(<>{text==null?"-":<>{"₹"}{addZeroes(text)}</>}</>)
              
            },
            {
              title: "Purchase",
              dataIndex: "purchase_amount",
              key: "purchase_amount",
              // width: 10,
              align: "center",
              render:(text,record)=>(<>{text==null?"-":<>{"₹"}{addZeroes(text)}</>}</>)
              }

          ]
          
        },
      ],
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} size="small" bordered pagination={false}/>
    </div>
  );
}

export default Tables;
