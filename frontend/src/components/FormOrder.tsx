import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import "./../assets/css/style.css";
import { Link } from "react-router-dom";
import { Order } from "../models/order";
import axios from "axios";

function FormOrder() {

  //variables
  const [order, setOrder] = useState<Order>({});
  const [productsOrder, setProductsOrder] = useState<object[]>([]);
  const [product, setProduct] = useState<any>({
    productName: '',
    quantity: '',
    productWeight: '',
    
  });
  const [shippingMethods, setShippingMethods] = useState<object[]>([]);

  //setters
  const setDataOrder = (e: any) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };
  const setDataProduct = (e: any) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const setDataProductOrder = ()=>{
    setProductsOrder([
      ...productsOrder,
      product
    ])

    setProduct({
      productName: '',
      quantity: '',
      productWeight: '', 
    })

  }

  //functions
  const saveOrder = ()=>{

    axios
      .post(
        "http://localhost:3001/api/order/create-order",order,
        {}
      )
      .then((response) => {
        let getOrders: any = localStorage.getItem("orders");
        if(getOrders){
          let ordersStorage:Order[] = JSON.parse(getOrders);
          ordersStorage.push(response.data.data)
          localStorage.setItem("orders", JSON.stringify(ordersStorage));
        }
        window.location.href = "/"
        return response;
      });

  }


  //effects
  useLayoutEffect(()=>{
    setOrder({
      ...order,
      lineItems: productsOrder,
    });
  }, [productsOrder])

  useEffect(() => {
    const options = {
      headers: { "x-api-key": "8hu71URNzm7FCLV9LfDPd9Gz61zN2diV6kG2hDEw" },
    };
    
    axios
      .get(
        "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods",
        options
      )
      .then((r) => {
        setShippingMethods(r.data)
        return r;
      });
  }, []);


  return (
    <Fragment>
      <div className="container">
        <div className="card mt-5">
          <div className="card-header bg-primary text-light">
            <h1>Order Form</h1>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-md-8">
                  <h2 className="fw-bold">Order Information</h2>
                </div>
                <div className="col-md-4">
                  <h2 className="fw-bold">Line items</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-1">
                    <label className="form-label">Seller store</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="sellerStore"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Shipping method</label>
                    <select
                      className="form-select"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      
                      name="shippingMethod"
                      aria-label="Default select example"
                    >
                      <option value="">Seleccionar</option>
                      {
                        shippingMethods.map((res:any, index)=>{
                          return (

                            <option key={index} value={res.id}>{res.name}</option>
                          )
                        })
                      }
                     
                    </select>
                  </div>
                  <div className="mb-1">
                    <label className="form-label">External order number</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="externalOrderNumber"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Buyer full name</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="buyerFullName"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Buyer phone number</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="buyerPhoneNumber"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-1">
                    <label className="form-label">Buyer email</label>
                    <input
                      type="email"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="buyerEmail"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Shipping address</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="shippingAddress"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Shipping city</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="shippingCity"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Shipping region</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="shippingRegion"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Shipping country</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataOrder(e);
                      }}
                      name="shippingCountry"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-1">
                    <label className="form-label">Product name</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setDataProduct(e);
                      }}
                      value={product.productName}
                      name="productName"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Product quantity</label>
                    <input
                      type="number"
                      onChange={(e) => {
                        setDataProduct(e);
                      }}
                      value={product.quantity}
                      name="quantity"
                      className="form-control"
                      />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Product weight</label>
                    <input
                      type="number"
                      onChange={(e) => {
                        setDataProduct(e);
                      }}
                      value={product.productWeight}
                      name="productWeight"
                      className="form-control"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="button"  onClick={()=>{ setDataProductOrder() }} className="btn btn-warning btn-block">Add</button>
                  </div>
                    
                    {
                      productsOrder.map((r:any, index)=>{
                        return (

                          <div className="card mt-4" key={index}>
                            <div className="card-body py-1">
                              <p className="m-0 fw-bold">Name: {r.productName}</p>
                              <div className="d-flex justify-content-between">
                                <span>Weight: {r.productWeight} Kg</span>
                                <span>Quantity: {r.quantity}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4">
          <Link to="/">
            <button type="submit" className="btn btn-danger mx-2 px-5">
              Cancel
            </button>
          </Link>
          <button type="button" onClick={()=>{
            saveOrder()
          }} className="btn btn-primary px-5">Save</button>
        </div>
      </div>
    </Fragment>
  );
}

export default FormOrder;
