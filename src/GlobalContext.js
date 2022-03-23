import axios from "axios";
import React, {createContext, useState} from "react"
import { useEffect } from "react";
import GetProducts from "./Components/GetApis/GetProducts";
import GetUsers from "./Components/GetApis/GetUsers";
import GetCategories from "./Components/GetApis/GetCategories";
export const GlobalContext = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)

    useEffect(() =>{  
         const firstLogin = localStorage.getItem("firstLogin")
         if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
            }
            refreshToken()
         }        
    },[])

   
        const state = {
            token : [token, setToken],
            GetProducts :  GetProducts(),
            getUsers : GetUsers(token),
            getCategories : GetCategories()
        }


    return(
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
}