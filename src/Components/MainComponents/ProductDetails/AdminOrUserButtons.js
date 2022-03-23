import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {GlobalContext} from "./../../../GlobalContext";


function AdminOrUserButtons({product, deleteProduct}) { 
  const state = useContext(GlobalContext)
  const [isAdmin] = state.getUsers.isAdmin
  const addCart = state.getUsers.addCart
  

  return (
      <>
             <div className='row_btn'>
               {
                 isAdmin ? 
                 <>             
                 <Link id='btn_buy' style={{backgroundColor: "#FF6347"}} to="#!" onClick={deleteProduct}>Delete</Link>
                 <Link id='btn_view' style={{backgroundColor: "#696969"}} to={`/edit_product/${product._id}`}>Edit</Link>
                 </>
                 : <>
                  <Link id='btn_buy' to="#!" onClick={() => addCart(product)}>Buy</Link>
                  <Link id='btn_view' to={`/detail/${product._id}`}>View</Link>
                 </>
               }
                       
                    </div>
      </>
  )
}

export default AdminOrUserButtons;
