import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";



const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch]  = useState("");

// console.log(search);
  const getData = async () => {
    const response = await fetch("http://localhost:3000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setFoodItems(data[0]);
    // console.log(data[0]);
    setFoodCat(data[1]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {setSearch(e.target.value)}}
                />
                {/* <button className="btn btn-outline-success" type="submit">
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300×300/?burger"
                style={{ filter: "brightnes(30%)" }}
                className="d-block h-100 w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300/?pizza"
                style={{ filter: "brightnes(30%)" }}
                className="d-block h-100 w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300/?pastry"
                style={{ filter: "brightnes(30%)" }}
                className="d-block h-100 w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat &&
          foodCat.map((data) => {
            return (
              <div key={data._id} className="row">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItems &&
                  foodItems
                    .filter((item) => (data.CategoryName === item.CategoryName) &&  (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filteredItems) => {
                      return (
                        <div
                          key={filteredItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card props={filteredItems} />
                        </div>
                      );
                    })}
              </div>
            );
          })}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
