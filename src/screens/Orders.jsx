import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  // const [dataArr, setDataArr] = useState([]);



  
  let TotalOrder = [];
  orderData.map((data) => TotalOrder.push(...data));

  let totalPrice = TotalOrder.reduce((total, food) => total + food.price, 0);
  
  const hanldeOrderData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/myOrderData");
      const data = await response.json();
      let order_data = data.orderData.order_data;
      // console.log(order_data);

      // setOrderData(prevOrderData => [...prevOrderData, ...order_data]);
      setOrderData(order_data);
    } catch (error) {
      console.error("Error fetching order data : ", error);
    }
  };
  // console.log(orderData);
  useEffect(() => {
    hanldeOrderData();
  }, []);

  let discount = 0;
  let gst = 0;
  if(TotalOrder.length === 0 ){
    discount = 0;
    gst = 0;
  }else if(TotalOrder.length > 0 && TotalOrder.length < 5){
    discount = 59;
    gst = 19;
  } else if(TotalOrder.length < 5){
    discount = 109;
    gst = 19;
  } 
  let finalPrice = totalPrice - discount - gst;

  if (TotalOrder.length === 0) {
    return (
      <>
        <div className="m-5 text-center fs-3">Your Orders are Empty! Keep Shoping</div>
      </>
    );
  }
  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{ borderRadius: "10px" }}>
             
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p
                    className="lead fw-normal mb-0"
                    style={{ color: "#a8729a" }}
                  >
                    Receipt
                  </p>
                  <p className="small text-muted mb-0">
                    Receipt Voucher : 1KAU9-84UIL
                  </p>
                </div>
                {TotalOrder &&
                  TotalOrder.map((order,index) => {
                   return (<div className="card shadow-0 border mb-4" key={index}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              src={order.img}
                              className="img-fluid"
                              style={{ height:"120px", width:"120px"}}
                              alt={order.name}
                            />
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">{order.name}</p>
                          </div>
                        
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              Size: {order.size}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Qty: {order.qty}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">₹ {order.price}</p>
                          </div>
                        </div>
                        <hr
                          className="mb-4"
                          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                        />
                        <div className="row d-flex align-items-center">
                          <div className="col-md-2">
                            <p className="text-muted mb-0 small">Track Order</p>
                          </div>
                          <div className="col-md-10">
                            <div
                              className="progress"
                              style={{ height: "6px", borderRadius: "16px" }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: "65%",
                                  borderRadius: "16px",
                                  backgroundColor: "#a8729a",
                                }}
                                aria-valuenow="65"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <div className="d-flex justify-content-around mb-1">
                              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                Out for delivary
                              </p>
                              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                Delivered
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)
                  })}

              
                <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">Order Details</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Total</span>₹ {totalPrice}.00
                  </p>
                </div>

                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">Invoice Number : 788152</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Discount</span> ₹ {discount}
                  </p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">GST 18%</span>₹ {gst}
                  </p>
                </div>

                <div className="d-flex justify-content-between mb-5">
                  <p className="text-muted mb-0">
                    Recepits Voucher : 18KU-62IIK
                  </p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Delivery Charges</span> Free
                  </p>
                </div>
              </div>
              <div
                className="card-footer border-0 px-4 py-5"
                style={{
                  backgroundColor: "#a8729a",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                  Total paid: <span className="h2 mb-0 ms-2">₹ {finalPrice}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
