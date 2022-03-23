import React, { useContext, useState } from 'react';
import { GlobalContext } from "../../GlobalContext";
import Menu from "./images/Menu.svg";
import Cart from "./images/Cart.svg";
import Close from "./images/Close.svg";
import "./Header.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalContext)
    const [isLogged] = state.getUsers.isLogged
    const [isAdmin] = state.getUsers.isAdmin
    const [cart] = state.getUsers.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () => {
        await axios.get("https://dk-e-commerce.herokuapp.com/user/logout")
        localStorage.removeItem("firstLogin")
        window.location.href = "/"
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">Order History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    const toggleMenu = () => setMenu(!menu)
    const styleMenu = {
        left : menu ? 0 : "-100%"
    }

    return (
        <>
            <header>
                <div className='menu' onClick={() => setMenu(!menu)}>
                    <img src={Menu} alt="Menu_icon" width="30" />
                </div>
                <h1><Link to="/">{isAdmin ? "Admin Pannel" : "Shoppers World"}</Link></h1>
                <ul style={styleMenu}>
                    <li><Link to="/">{isAdmin ? "Products" : "Shop"}</Link></li>

                    {isAdmin && adminRouter()}
                    {
                        isLogged ? loggedRouter() : <li><Link to="/login">Login and Register</Link></li>
                    }

                    <li onClick={() => setMenu(!menu)}> 
                        <img src={Close} alt="close_icon" width="30" className='menu' />
                    </li>
                    <li><Link to="/"></Link></li>
                </ul>

                {
                    isAdmin ? "" : <div className='cart'>
                                     <span>{cart.length}</span>
                                        <Link to="/cart">
                                           <img src={Cart} alt="cart" width="30" />
                                        </Link>
                                   </div>
                } 

            </header>
        </>
    )
}

export default Header;