import { BrowserRouter, Route, Routes } from "react-router-dom";
import DrawerAppBar from "./components/DrawerAppBar";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";
import { Account } from "./components/Account";


function App() {
  return (
    <>
    

    <BrowserRouter>
    <DrawerAppBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/account" element={<Account/>}/>

    </Routes>
    </BrowserRouter>
      
    
    </>
  );
}

export default App;
