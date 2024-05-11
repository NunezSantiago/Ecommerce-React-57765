import { CartWidget } from "./CartWidget"
import { NavBar } from "./NavBar"

export const Header = () => {
    return (
      <header className="header">
          <div>
              <h1>Store</h1>
          </div>
          <NavBar />
          <CartWidget />
      </header>
    )
  }