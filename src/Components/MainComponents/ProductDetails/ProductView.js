import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext";
import ProductItem from './ProductItem';
import "./ProductView.css";
function ProductView() {
  const params = useParams()
  const state = useContext(GlobalContext)
  const [products] = state.GetProducts.products
  const [detailProduct, setDetailProduct] = useState([])
  const addCart = state.getUsers.addCart

  useEffect(() => {
    if (params.id) {

      products.forEach(product => {
        if (product._id === params.id) setDetailProduct(product)
      })
    }
  }, [params.id, products])

  if (detailProduct.length === 0) return null;
  return (
    <>
      <div className='detail'>
        <img src={`${detailProduct.imageUrl}`} alt="" class="card-img-top" />
        <div className='box-detail'>
          <div className='row'>
            <h2>{detailProduct.title}</h2>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p style={{fontWeight:"bold", marginTop:"15px"}}>Additional Information </p>
          <p>{detailProduct.content}</p>
          <Link to="/cart" onClick={() => addCart(detailProduct)} className='cart mb-4'>Buy Now</Link>
        </div>
      </div>

      <div>
        <h2 className='related'>Related products</h2>
        <div className="products">
          {
            products.map(product => {
              return product.category === detailProduct.category
                ? <ProductItem key={product._id} product={product} /> : null
            })
          }
        </div>
      </div>
    </>
  )
}

export default ProductView;
