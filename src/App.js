import "./App.css";
import kra from "../src/kra.png";
import { useEffect, useState } from "react";
import axios from "axios";
import useInterval from "./useInterval";
import Tables from "./Tables";

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

  return (
    <div className="App">
      <div className="marquee">
        <img src={kra} alt="" />
        <marquee className="marq" title="marquee">
          {data?.map((products) => {
            return (
              <div className="tab">
                <span className="text">
                  {products.product_name} = ₹. {products.amount}
                </span>
              </div>
            );
          })}
        </marquee>
      </div>
      <Tables />
    </div>
  );
}
export default App;
