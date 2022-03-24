import React, { createContext } from "react"
import GetProducts from "./Components/GetApis/GetProducts";
import GetUsers from "./Components/GetApis/GetUsers";
import GetCategories from "./Components/GetApis/GetCategories";
export const GlobalContext = createContext();

export const DataProvider = ({ children }) => {

    const state = {
        GetProducts: GetProducts(),
        getUsers: GetUsers(),
        getCategories: GetCategories()
    }


    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
}