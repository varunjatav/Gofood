import React, { createContext,  useReducer } from 'react'

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": 
    return [...state,{id:action.id, name:action.name, price:action.price, qty:action.qty,size:action.size, img:action.img}];

    case "REMOVE":
      let newState = [...state];
      newState.splice(action.id, 1);
      return newState;

    case "UPDATE":
      let arr = [...state]
      arr.find((food,index) =>{
        if(food.id === action.id){
          console.log(food.qty, parseInt(action.qty), action.price + food.price);
          arr[index] = {...food, qty: parseInt(action.qty) + food.qty, price:food.price+ action.price}
        }
      });
      return arr;  
    default:
      console.log("Error: Unknown action");
  }
}

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer,[]);
  return (
   <CartDispatchContext.Provider value={dispatch}>
    <CartStateContext.Provider value={state}>
      {children}
    </CartStateContext.Provider>
   </CartDispatchContext.Provider>
  )
  
}
