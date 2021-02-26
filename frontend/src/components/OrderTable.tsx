import React, { Fragment, useState, useEffect } from "react";
import "./../assets/css/style.css";
import {Order} from './../models/order';
import {
  Link,
} from "react-router-dom";

function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([])

  const loadInformation = ()=>{
    let exist = localStorage.getItem("orders")
    if(!exist){
      let form: Order[] = [];
      localStorage.setItem("orders", JSON.stringify(form));
    }
  }
  loadInformation()
  
  
  useEffect(()=>{
    let getOrders: any = localStorage.getItem("orders");
    if(getOrders){
      let ordersStorage:Order[] = JSON.parse(getOrders);
      setOrders(ordersStorage)
    }
  },[])

  const setOrder:any = (value:object)=>{
    localStorage.setItem("order", JSON.stringify(value));
  }

  return (
    <Fragment>
      <div className="container mt-5">

          <Link to="/create">
            <button className="btn btn-primary d-flex ms-auto my-2">

            Create Order
            </button>
          </Link>
        <table className="table">
          <thead className="table-dark bg-primary">
            <tr className="text-center">
              <th scope="col">ID</th>
              <th scope="col">STORE</th>
              <th scope="col">DATE</th>
              <th scope="col">SHIPPING METHOD</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((val: any, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td>{val.externalOrderNumber}</td>
                  <td>{val.sellerStore}</td>
                  <td>{val.date}</td>
                  <td>{val.shippingMethod}</td>
                  <td>
                    <Link to={`/detail/${val.externalOrderNumber}`}>
                      <button className="btn btn-primary btn-sm" onClick={()=>{setOrder(val)}}>Show</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default OrderTable;
