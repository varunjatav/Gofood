import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  
      setUser({ ...user, [name]: value });
 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/loginuser", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        alert("Enter Valid Credentials");
      }else{
        localStorage.setItem("authToken", data.authToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Error = ", error);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
       
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={handleChange}
              name="email"
              value={user.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={handleChange}
              name="password"
              value={user.password}
            />
          </div>
         
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
           I am a new user
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
