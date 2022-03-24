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
  const [callback, setCallback] = state.GetProducts.callback
  const token = localStorage.getItem('firstLogin')
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
