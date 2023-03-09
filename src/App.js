import './App.css';
import kra from '../src/kra.png';
import { useEffect, useState } from 'react';

import axios from 'axios';
import useInterval from './useInterval';
import Tables from './Tables';

function App() {

  const [data, setData] = useState()

  const fetchInfo = () => {
    return fetch()
      .then((res) => res.json())
      .then((d) => setData(d))
  }
  
  const requestInterval = 300000
  function test (){
      
      axios.get("http://192.168.2.22:5002/goldrate")
        .then((res) => {
          setData(res.data)
          console.log('err', res.data)
        })
  
        .catch((err) => {
          console.log(err)
        })
      }
  useEffect (()=>{
    test()
  },[])
   
      useInterval(
        () => {
            test();
            // console.log("Interval Called");
        },
        requestInterval
    )
  return ( 


    <div className="App">
      <div className='marquee'>

        <img src={kra} alt="" />


        <marquee className="marq">
          {data?.map((products) => {
            return(
             <div  className = 'tab'><span className='text'>{products.product_name} = RS.{products.amount}</span></div>
            
            )

          })}
       
          {/* <div className='tab2'><span className='text'>{product.product_name} {product.amount}</span></div> */}
          {/* <div className='tab'><span className='text'>{product.product_name} {product.amount}</span></div> */}
          {/* <div className='tab2'><spa className='text'>{product.product_name} {product.amount}</spa></div> */}
        </marquee>
    

      </div>
     

<Tables/>

    </div>
  );
}

export default App;








// const [user ,setUser] = useState([]);
// useEffect (()=>
// {
//     axios.get("https://jsonplaceholder.typicode.com/users")
//     .then((res)=>
//     {
//         setUser(res.data)
//         console.log('err',res.data)
//     })
//     .catch((err)=>
//     {
//         console.log(err)
//     })
// },[])