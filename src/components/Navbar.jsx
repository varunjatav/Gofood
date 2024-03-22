import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { CartStateContext } from "./ContextReducer";
import Modal from "../Modal";

import Cart from "../screens/Cart";
const Navbar = () => {
  const useCart = () => useContext(CartStateContext);
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          Gofood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myorders"
                >
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex">
            {!localStorage.getItem("authToken") ? (
              <>
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>

                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link className="btn bg-white text-success mx-2" onClick={()=> setCartView(true)}>My Cart {data.length > 0 && (<Badge pill bg="danger">{data.length}</Badge>)}</Link>
                {cartView && <Modal onClose={() => setCartView(false)}>
                  <Cart/>
                  </Modal>}
                <Link
                  className="btn bg-danger text-white mx-2"
                  onClick={handleLogout}
                >
                  Log out
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
