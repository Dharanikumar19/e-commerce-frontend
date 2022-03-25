import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { GlobalContext } from "./../../../GlobalContext";
import "./Cart.css"
import axios from 'axios';
import PayPalPayment from "./PayPalPayment";

function Cart() {
  const state = useContext(GlobalContext);
  const [cart, setCart] = state.getUsers.cart
  const [total, setTotal] = useState(0)
  const token = localStorage.getItem('firstLogin')

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(total)
    }
    getTotal()
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch("https://e-commerce-website-dk.herokuapp.com/user/addcart", {cart}, {
      headers: { Authorization: token }
    })
  }



  const increment = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const removeProductFromCart = (id) => {
    if (window.confirm("Confirm remove product from Cart")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1)
        }
      })
      setCart([...cart])
      addToCart(cart)
    }
  }

  const tranSuccess = async (payment) => {
    const {paymentID, address} = payment;
    await axios.post("https://e-commerce-website-dk.herokuapp.com/api/payment", {cart, paymentID, address},{
      headers : {Authorization: token}
    })
    setCart([])
    addToCart([])
    alert("Your Order has been Placed Succesfully")
  }

  if (cart.length === 0)
    return <h6 className='mt-3' style={{ textAlign: "center", fontSize: "2rem" }}>Cart is Empty</h6>


  return (
    <div>
      {
        cart.map(product => (
          <div className='detail cart-final' key={product._id}>

            <img src={`${product.imageUrl}`} alt="" className="card-img-top" />
            <div className='box-detail'>
              <div className='row'>
                <h2>{product.title}</h2>
              </div>
              <span>$ {product.price * product.quantity}</span>
              <p>{product.description}</p>   

              <div className='amount'>
                <button onClick={() => decrement(product._id)}> - </button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}> + </button>
              </div>
              <div className='delete' onClick={() => removeProductFromCart(product._id)}> X </div>

            </div>
          </div>
        ))
      }

      <div className='total mt-5 mb-5 pb-5'>
        <h3>Total : $ {total} </h3>
       <PayPalPayment className="mr-5" total={total} tranSuccess = {tranSuccess} />
      </div>
    </div>
  )
}

export default Cart;
