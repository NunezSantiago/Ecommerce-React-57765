import { Link } from "react-router-dom"
import { CartWidget } from "./CartWidget"
import { NavBar } from "./NavBar"

export const Header = () => {
    return (
      <header className="header">
          <div>
              <h1><Link to="/" className="brand">Store</Link></h1>
          </div>
          <NavBar />
          <CartWidget />
      </header>
    )
  }