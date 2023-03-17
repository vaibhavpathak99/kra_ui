/* eslint-disable jsx-a11y/no-distracting-elements */
import "./App.css";
import kra from "../src/kra.png";
import { useEffect, useState } from "react";
import axios from "axios";
import useInterval from "./useInterval";
import Tables from "./Tables";
import moment from "moment"
function App() {
  const [data, setData] = useState([]);
  function test() {
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
    test();
  }, []);

  useInterval(() => {
    test();
  }, 900000);

  function addZeroes(num) {
    // Cast as number
    var num = Number(num);
    // If not a number, return 0
    if (isNaN(num)) {
      return 0;
    }
    // If there is no decimal, or the decimal is less than 2 digits, toFixed
    if (String(num).split(".").length < 2 || String(num).split(".")[1].length <= 2) {
      num = num.toFixed(2);
    }
    // Return the number
    return num;
  }

  return (
    <div className="App">
      <div className="marquee">
        <img src={kra} alt="" style={{marginTop:"10px" , height:"120px" ,marginLeft:"10px"}}/>
        <marquee className="marq" >
          <div className="tab">
            <span className="text">
              Sales Amount
            </span>
            <span className="text1">
              Purchase Amount
            </span>
          </div>
          {data?.map((products) => {
            return (
              <div className="tab">
                <span className="text">
                  {products.product_name == "Silver 0" ? "Silver Article" : products.product_name == "silver 100" ? "Silver Bar" : products.product_name}T = {products.sale_amount == null ? "-" : <>₹ {addZeroes(products.sale_amount)}</>}
                </span>
                <span className="text1">
                  {products.product_name == "Silver 0" ? "Silver Article" : products.product_name == "silver 100" ? "Silver Bar" : products.product_name}T  = {products.purchase_amount == null ? "-" : <>₹ {addZeroes(products.purchase_amount)}</>}
                </span>
              </div>
            );
          })}
        </marquee>
      </div>
      <div style={{float:"right",marginRight:"20px",marginBottom:"5px",fontWeight:"bold"}}>
          {moment(data[0]?.updated).format("yyyy-MM-DD hh:mm:ss A")}
      </div>
      <Tables />
    </div>
  );
}
export default App;
