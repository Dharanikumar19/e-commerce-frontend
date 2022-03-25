import axios from "axios";
import { useEffect, useState } from "react";


function GetUsers() {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const token = localStorage.getItem('firstLogin')

    useEffect(() =>{
        
        if(token){
            const getUser = async () =>{
                try {
                    const result = await axios.get("https://e-commerce-website-dk.herokuapp.com/user/info" ,{
                        headers: {Authorization : token}
                    })
                    setIsLogged(true)
                    result.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(result.data.cart)
                
                } catch (error) {
                    alert(error.response.data.message)
                }
            }
            getUser()
        }
    },[token])
    


     const addCart = async (product) => {
       if(!isLogged) return alert("Please Login to Buy Products")

      const check = cart.every(item => {
        return item._id !== product._id
    })

    if(check){
        setCart([...cart, {...product, quantity: 1}])
        await axios.patch('https://e-commerce-website-dk.herokuapp.com/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
            headers: {Authorization: token}
    })
    }else{
        alert("This Product already added to cart")
    }
   }


  return (
     
           {
               isLogged : [isLogged, setIsLogged],
               isAdmin : [isAdmin, setIsAdmin],
               cart : [cart, setCart],
               addCart : addCart,
               history : [history, setHistory]
              
           }
      
  )
}

export default GetUsers;
