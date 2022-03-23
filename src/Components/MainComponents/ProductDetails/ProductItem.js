import axios from 'axios';
import React from 'react';
import AdminOrUserButtons from './AdminOrUserButtons';
import "./Products.css";

function ProductItem({ product, token, callback, setCallback }) {

    const deleteProduct = async () =>{
        if (window.confirm("Confirm delete Product")) {
        try {
            const deleteProduct = axios.delete(`https://dk-e-commerce.herokuapp.com/api/products/${product._id}`,{
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

            <div class="product_card">
                  <img src={`${product.imageUrl}`} alt="" class="card-img-top"/>
                 <div className='product_box'>
                    <h2 className='mt-2'> {product.title}</h2>
                   <h5 class="product-price">$ ~ {product.price}</h5>
                    <p> {product.description}</p>
                    </div>
                    <AdminOrUserButtons product={product} deleteProduct={deleteProduct} />
            </div>
                  
        </>

    )
}

export default ProductItem;
