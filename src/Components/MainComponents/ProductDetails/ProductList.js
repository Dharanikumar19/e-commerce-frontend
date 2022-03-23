import React from 'react';
import { useContext } from 'react';
import {GlobalContext} from "../../../GlobalContext"
import FilterProduct from './FilterProduct';
import ProductItem from './ProductItem';
import "./Products.css";

function ProductList() {
  const state = useContext(GlobalContext)
  const [products] = state.GetProducts.products
  const [isAdmin] = state.getUsers.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.GetProducts.callback
    return (
        <>
      
        <FilterProduct/>

        <div className='products'>
        {
            products.map(product =>{
                return <ProductItem key={product._id} product={product} isAdmin={isAdmin} token={token} 
                callback={callback} setCallback={setCallback} />
            })
        }
        </div>
        </>
    )
}

export default ProductList;
