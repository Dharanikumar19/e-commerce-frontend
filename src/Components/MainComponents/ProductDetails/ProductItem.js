import axios from 'axios';
import React from 'react';
import AdminOrUserButtons from './AdminOrUserButtons';
import "./Products.css";

function ProductItem({ product, token, callback, setCallback }) {

    const deleteProduct = async () =>{
        if (window.confirm("Confirm delete Product")) {
        try {
            const deleteProduct = axios.delete(`https://e-commerce-website-dk.herokuapp.com/api/products/${product._id}`,{
                headers : { Authorization : token}
            })
            await deleteProduct
            setCallback(!callback)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    }

    return (
        <>

            <div className="product_card">
                  <img src={`${product.imageUrl}`} alt="" className="card-img-top"/>
                 <div className='product_box'>
                    <h2 className='mt-2'> {product.title}</h2>
                   <h5 className="product-price">$ ~ {product.price}</h5>
                    <p> {product.description}</p>
                    </div>
                    <AdminOrUserButtons product={product} deleteProduct={deleteProduct} />
            </div>
                  
        </>

    )
}

export default ProductItem;
