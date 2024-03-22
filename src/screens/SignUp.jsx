import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
       console.log(name , " ", value);
        if( value !== ""){
            setUser({...user, [name]: value});
        }
       
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:3000/api/createuser", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                  },
            });
            const data = await response.json();
            
            if(!data.success) {
              alert("Enter Valid Credentials");
            }
            
        } catch (error) {
            console.error("Error = ", error);
        }
       
    }
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" >
              Name
            </label>
            <input type="text" className="form-control" onChange={handleChange} name="name" value={user.name}/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" onChange={handleChange} name="email" value={user.email}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" onChange={handleChange} name="password" value={user.password}/>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input type="text" className="form-control" onChange={handleChange} name="location" value={user.location}/>
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to='/login' className="m-3 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
