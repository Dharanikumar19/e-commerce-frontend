import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from "./../../../GlobalContext";

function OrderDetails() {

    const state = useContext(GlobalContext)
    const [history] = state.getUsers.history
    const [orderDetails, setOrderDetails] = useState([])
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])
    console.log(orderDetails)


    if (orderDetails.length === 0) return null;
    return (
        <>
            <h4 className='mt-3 mb-3 text-center'>Order Details</h4>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        orderDetails.cart.map(item => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>₹ : {item.price * item.quantity}</td>
                                <td>{item.category}</td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </>
    )
}

export default OrderDetails;
