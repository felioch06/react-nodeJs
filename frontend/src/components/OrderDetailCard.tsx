import React, { Fragment, useState, useEffect } from "react";
import "./../assets/css/style.css";
import { Link } from "react-router-dom";
import { Order } from "../models/order";

function OrderDetailCard() {
  const [order, setOrder] = useState<Order>({});
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    let getOrder: any = localStorage.getItem("order");
    if (getOrder) {
      let orderStorage: Order = JSON.parse(getOrder);
      let lineItemsStorage:any = orderStorage.lineItems
      setOrder(orderStorage);
      setLineItems(lineItemsStorage)
    }
  }, []);

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 mb-3">
            <Link to="/">
              <button className="btn btn-danger mb-2">Volver</button>
            </Link>
            <div className="card">
              <div className="card-header bg-primary text-light">
                <h2>Promise Dates</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="" className="fw-bold">
                      Package min
                    </label>
                    <p>{order.packPromiseMin}</p>
                    <label htmlFor="" className="fw-bold">
                      Package max
                    </label>
                    <p>{order.packPromiseMax}</p>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="" className="fw-bold">
                      Shipping min
                    </label>
                    <p>{order.shipPromiseMin}</p>
                    <label htmlFor="" className="fw-bold">
                      Shipping max
                    </label>
                    <p>{order.shipPromiseMax}</p>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="" className="fw-bold">
                      Delivery min
                    </label>
                    <p>{order.deliveryPromiseMin}</p>
                    <label htmlFor="" className="fw-bold">
                      Delivery max
                    </label>
                    <p>{order.deliveryOromiseMax}</p>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="" className="fw-bold">
                      Ready pickup min
                    </label>
                    <p>{order.readyPickupPromiseMin}</p>
                    <label htmlFor="" className="fw-bold">
                      Ready pickup max
                    </label>
                    <p>{order.readyPickupPromiseMax}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-header bg-primary text-light">
                <h2>Order Information</h2>
              </div>
              <div className="card-body">
                <label htmlFor="" className="fw-bold">
                  External order number
                </label>
                <p>{order.externalOrderNumber}</p>
                <label htmlFor="" className="fw-bold">
                  Buyer full name
                </label>
                <p>{order.buyerFullName}</p>
                <label htmlFor="" className="fw-bold">
                  Buyer phone number
                </label>
                <p>{order.buyerPhoneNumber}</p>
                <label htmlFor="" className="fw-bold">
                  Buyer email
                </label>
                <p>{order.buyerEmail}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-header bg-primary text-light">
                <h2>Shipping Information</h2>
              </div>
              <div className="card-body">
                <label htmlFor="" className="fw-bold">
                  Shipping address
                </label>
                <p>{order.shippingAddress}</p>
                <label htmlFor="" className="fw-bold">
                  Shipping city
                </label>
                <p>{order.shippingCity}</p>
                <label htmlFor="" className="fw-bold">
                  Shipping region
                </label>
                <p>{order.shippingRegion}</p>
                <label htmlFor="" className="fw-bold">
                  Shipping country
                </label>
                <p>{order.shippingCountry}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-header bg-primary text-light">
                <h2>Line Items</h2>
              </div>
              <div className="card-body">
                {
                  
                  lineItems.map((res:any, index)=>{
                    return(
                      <div key={index}>
                        <label htmlFor="" className="fw-bold">
                          {res.productName}
                        </label>
                        <div className="d-flex justify-content-between">
                          <p>{res.productWeight}</p>
                          <span>{res.quantity}</span>
                        </div>
                      </div>
                    )
                  })
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OrderDetailCard;
