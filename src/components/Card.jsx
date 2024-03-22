import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartDispatchContext, CartStateContext } from "../components/ContextReducer";

const Card = ({props}) => {
  const useCart = () => useContext(CartStateContext);
  const useDispatchCart = () => useContext(CartDispatchContext);
  const dispatch = useDispatchCart();
  const options = props.options[0];
  const optionObj = Object.keys(options);
  const priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);
  finalPrice = Number(finalPrice);
  const data = useCart();

  useEffect(() => {
    setSize(priceRef.current.value);
  },[])
  const handleAddToCart = async() => {
    let food = [];
    for(const item of data) {
      if(item.id ===props._id){
        food = item;
        break;
      }
    }
    if(food !== []){
      if(food.size === size){
        await dispatch({type: "UPDATE", id: props._id, price: finalPrice, qty: qty});
        return;
      }else if(food.size !== size){
        await dispatch({type:"ADD", id:props._id, name:props.name, price:finalPrice , qty:qty, size:size, img:props.img});
        return;
      }
    }
    await dispatch({type:"ADD", id:props._id, name:props.name, price:finalPrice , qty:qty, size:size, img:props.img});
    // console.log(data);
  }
 
  return (
    <div className="card mt-3" style={{ width: "18rem" , maxHeight:"400px"}}>
    <img src={props.img} className="card-img-top" style={{height:"180px", objectFit:"fill"}} alt= {props.name + ".png"}/>
    <div className="card-body">
      <p className="card-text">
       {props.name}
      </p>
      <div className="container w-100">
        <select name="" id="" className="m-2 h-100 bg-success rounded" onChange={(e)=> setQty(e.target.value)}>
         {Array.from(Array(6),(e,i) => {
          return (
            <option key={i+1} value={i+1}> {i+1}</option>
          )
         })}
        </select>

        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
        {optionObj.map((option) => <option  value={option} key={option}>{option}</option>)}   
        </select>
        <div className='d-inline'>
          
          Rs. {finalPrice}
        </div>
      </div>
      <hr />
      <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
    </div>
  </div>
  )
}

export default Card