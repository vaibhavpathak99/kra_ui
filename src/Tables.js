import React, { useEffect, useState } from 'react'
import { Slider, Table } from 'antd'
import axios from 'axios';
function Tables() {
    const [data, setData] = useState([])



    useEffect(() => {
        axios.get("http://192.168.2.22:5002/goldrate")
            .then((res) => {
            
                setData(res.data)
      
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])
    const columns = [



        {
            // title: 'Metel(per grm)',
            children: [
                {


                    children: [
                        {
                            title: 'Metal',
                            dataIndex: 'product_name',
                            key: 'product_name',
                            width:200,
                            align: 'center',
                            
                            render: text => <>{text?.split(' ')[0]}</>,
                        },
                        {
                            title: 'Carat (gram)',
                            dataIndex: 'product_name',
                            key: 'product_name',
                            width:200,
                            align: 'center',
                            render: text => <>{text?.split(' ') [1]}    {text?.split(' ')[2]}</>,
                          },

                       {
                            title: 'Amount',
                            dataIndex: 'amount',
                            key: 'amount',
                            width:200,
                            align: 'center',

                        }]
                },


            ]
        }
    ]


    return (
        <div>


            <Table 
                columns={columns}
                dataSource={data}
                bordered
                size="large"
             

            />


        </div>
    );
}

export default Tables