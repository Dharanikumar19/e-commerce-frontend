import React,{useContext} from 'react';
import {Routes,Route} from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import Cart from './Cart/Cart';
import NotFound from './NotFound';
import ProductList from './ProductDetails/ProductList';
import ProductView from './ProductDetails/ProductView';

import {GlobalContext} from "./../../GlobalContext";
import OrderHistory from './Cart/OrderHistory';
import OrderDetails from './Cart/OrderDetails';
import Categories from './Categories/Categories';
import CreateProduct from './ProductDetails/CreateProduct';

function MainPages() {
  const state = useContext(GlobalContext)
   const [isLogged] = state.getUsers.isLogged
   const [isAdmin] = state.getUsers.isAdmin
  return (

    <Routes>
    <Route path="/" exact element={<ProductList/> } />
    <Route path="/create_product" exact element={ isAdmin ? <CreateProduct/> : <NotFound/> } />
    <Route path="/edit_product/:id" exact element={ isAdmin ? <CreateProduct/> : <NotFound/> } />
    <Route path="/detail/:id" exact element={<ProductView/> } />
    <Route path="/login" exact element={isLogged ? <NotFound/> : <Login/>} />
    <Route path="/register" exact element={isLogged ? <NotFound/> : <Register/>} />
    <Route path="/cart" exact element={<Cart/>} />
    <Route path="/history" exact element={ isLogged ? <OrderHistory/> : <NotFound/> } />
   
    <Route path="/history/:id" exact element={ isLogged ? <OrderDetails/> : <NotFound/> } />
    <Route path="/category" exact element={ isAdmin ? <Categories/> : <NotFound/> } />
    <Route path="*" exact element={<NotFound/>} />
    </Routes> 

  )
}

export default MainPages;
