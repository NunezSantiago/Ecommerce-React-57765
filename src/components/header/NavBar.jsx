//import React from 'react'

import { Link } from "react-router-dom"


export const NavBar = () => {
  return (
    <nav className="navBar">
      <ul className="navItems">
        <li className="navItem"><Link to="/" className="navLink">All products</Link></li>
        <li className="navItem"><Link to="/category/9" className="navLink">Samsung</Link></li>
        <li className="navItem"><Link to="/category/48" className="navLink">Apple</Link></li>
        <li className="navItem"><Link to="/category/80" className="navLink">Xiaomi</Link></li>
      </ul>
    </nav>
  )
}
