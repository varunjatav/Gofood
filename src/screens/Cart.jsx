import React, { useContext } from "react";
import {
  CartDispatchContext,
  CartStateContext,
} from "../components/ContextReducer";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const useDispatchCart = () => useContext(CartDispatchContext);
  const dispatch = useDispatchCart();
  const useCart = () => useContext(CartStateContext);
  const data = useCart();
  
  if (data.length === 0) {
    return (
      <>
        <div className="m-5 text-center fs-3">The Cart is Empty!</div>
      </>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  

  const handleDelete = async (index) => {
    await dispatch({ type: "REMOVE" ,payload:index});
  };

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
   

    let response = await fetch("http://localhost:3000/api/orderData",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
     
    });
   
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => {
              return (
                <tr key={index + 1}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{+(food.qty)}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(food.id)}
                    >
                      {" "}
                      <MdDelete />{" "}
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1>Total Price: {totalPrice} /-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckout}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
