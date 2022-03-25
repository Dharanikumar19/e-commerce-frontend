import axios from 'axios';
import React,{useState, useContext, useEffect} from 'react';
import {GlobalContext} from "./../../../GlobalContext";
import "./CreateProduct.css"
import {useNavigate, useParams} from "react-router-dom";

const initialState = {
    product_id : "",
    imageUrl : "",
    title : "",
    price : 0,
    description : "",
    content : "",
    category : "",
    _id : ""
}

function CreateProduct() {
    const navigate = useNavigate()
    const params = useParams()

    const state = useContext(GlobalContext)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.getCategories.categories
    const [isAdmin] = state.getUsers.isAdmin;
    const[products] = state.GetProducts.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.GetProducts.callback
    const token = localStorage.getItem('firstLogin')

    useEffect(() => {
        if(params.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === params.id) {
                    setProduct(product)
                }
            })     
        } else{
            setOnEdit(false)
            setProduct(initialState)
        }
    }, [params.id, products])
    


    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Not Authorized")

            if(onEdit){
                await axios.put(`https://e-commerce-website-dk.herokuapp.com/api/products/${product._id}`, {...product},{
                    headers : {Authorization : token}
                })
            }else{
                await axios.post("https://e-commerce-website-dk.herokuapp.com/api/products", {...product},{
                    headers : {Authorization : token}
                })
            }
            setCallback(!callback)     
            navigate("/")
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

  return (
      <>
       <div className="create_product">

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input style={{border : "1px solid black"}} type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit}
                    />
                </div>

                <div className="row">
                    <label htmlFor="title">ImageUrl - (Image Address)</label>
                    <input style={{border : "1px solid black"}} type="text" name="imageUrl" id="title" required
                    value={product.imageUrl} onChange={handleChangeInput} 
                    />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input style={{border : "1px solid black"}} type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} 
                    />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input style={{border : "1px solid black"}} type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} 
                    />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea style={{border : "1px solid black"}} type="text" name="description" id="description" required
                     value={product.description} rows="5" onChange={handleChangeInput} 
                    />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea style={{border : "1px solid black"}} type="text" name="content" id="content" required
                    value={product.content} rows="5" onChange={handleChangeInput} 
                    />
                </div>

                <div className="row mb-5">
                    <label htmlFor="categories">Categories: </label>
                    <select style={{border : "1px solid black", height:"40px"}} name="category" required
                    value={product.category} onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button className='btn btn-primary mb-5' type="submit">
                    {onEdit? "Update" : "Create"}
                    </button>
            </form>
        </div>
      
      </>
   
  )
}

export default CreateProduct;
