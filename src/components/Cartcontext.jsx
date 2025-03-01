import { createContext,useState } from "react";

const CartContext=createContext()
export default CartContext

export const  CartContextProvider=({children})=>{
    const [count,setCount]=useState()

     return(
        <CartContext.Provider value={{count,setCount}} >
              {children}
        </CartContext.Provider>
     )
}

