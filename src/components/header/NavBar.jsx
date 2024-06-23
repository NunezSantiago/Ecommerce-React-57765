//import React from 'react'

import { Link } from "react-router-dom"


export const NavBar = () => {
  return (
    <nav className="navBar">
      <ul className="navItems">
        <li className="navItem"><Link to="/" className="navLink">All products</Link></li>
        <li className="navItem"><Link to="/category/samsung" className="navLink">Samsung</Link></li>
        <li className="navItem"><Link to="/category/apple" className="navLink">Apple</Link></li>
        <li className="navItem"><Link to="/category/xiaomi" className="navLink">Xiaomi</Link></li>
      </ul>
    </nav>
  )
}
