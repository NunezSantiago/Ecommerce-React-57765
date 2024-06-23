/* eslint-disable no-unused-vars */

import { ItemDetailContainer } from './components/ItemDetailContainer'
import { ItemListContainer } from './components/ItemListContainer'
import { NotFound } from './components/NotFound'
import { Header } from './components/header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

function App() {
  return (

    <div>
      <CartProvider>
          <BrowserRouter>
            <Header />

            <Routes>
              <Route path='/' element={<ItemListContainer />} />
              <Route path='/category/:brandId' element={<ItemListContainer />} />
              <Route path='/item/:itemId' element={<ItemDetailContainer />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
    
  )
}

export default App

