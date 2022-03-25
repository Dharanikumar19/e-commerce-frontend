import React, { useContext, useEffect } from 'react';
import {GlobalContext} from "./../../../GlobalContext"
import {Link} from "react-router-dom";
import axios from 'axios';

function OrderHistory() {
    const state = useContext(GlobalContext)
    const [history, setHistory] = state.getUsers.history
    const [isAdmin] = state.getUsers.isAdmin
    const token = localStorage.getItem('firstLogin')


    useEffect(() => {
      if(token){
          const getHistory = async() => {
              if(isAdmin){
                  const result = await axios.get("https://e-commerce-website-dk.herokuapp.com/api/payment", {
                      headers : {Authorization : token}
                  })
                  setHistory(result.data)
              }else{
                  const result = await axios.get("https://e-commerce-website-dk.herokuapp.com/user/history", {
                      headers : {Authorization : token}
                  })
                  setHistory(result.data)
              }    
          }
          getHistory()
      }   
      }, [token, isAdmin, setHistory]);


  return (
      <>
        <h4 className='mt-4 mb-4 text-center'>{isAdmin ? "Users Order History" : "Your Order History"}</h4>
        <h5 className='mt-4 mb-4' style={{textAlign:"center"}}>{isAdmin ? "Users Total Order " : "Your Total Orders"} : {history.length} </h5>

        <table className="table table-striped">
  <thead>
    <tr style={{textAlign:"center"}}>
      <th scope="col">Payment ID</th>
      <th scope="col">Data of Purchased</th>
      <th scope="col">Order Details</th>
        <th></th>
    </tr>
  </thead>
  <tbody>

      {
          history.map(items => (
              <tr key={items._id} style={{textAlign:"center"}}>
      
            <td>{items.paymentID}</td>
            <td>{new Date(items.createdAt).toLocaleDateString()}</td>
            <td><Link to={`/history/${items._id}`}>View Order Details</Link></td>
            
           
          </tr>
          ))
      }
    
    
  </tbody>
</table>
      </>
  )
}

export default OrderHistory;
