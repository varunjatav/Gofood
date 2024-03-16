import React from 'react'

const Card = () => {
  return (
    <div className="card mt-3" style={{ width: "18rem" , maxHeight:"400px"}}>
    <img src="https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg" className="card-img-top " alt="food-image.png"/>
    <div className="card-body">
      <p className="card-text">
        This is some important text
      </p>
      <div className="container w-100">
        <select name="" id="" className="m-2 h-100  bg-success rounded">
         {Array.from(Array(6),(e,i) => {
          return (
            <option key={i+1} value={i+1}> {i+1}</option>
          )
         })}
        </select>

        <select name="" id="" className="m-2 h-100  bg-success rounded">
          <option value="half" key={1}>Half</option>
          <option value="full"key={2}>Full</option>
        </select>
        <div className='d-inline'>
            Total Price
        </div>
      </div>

    </div>
  </div>
  )
}

export default Card