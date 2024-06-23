/* eslint-disable no-unused-vars */

import { ItemDetailContainer } from './components/ItemDetailContainer'
import { ItemListContainer } from './components/ItemListContainer'
import { NotFound } from './components/NotFound'
import { Header } from './components/header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/category/:brandId' element={<ItemListContainer />} />
        <Route path='/item/:itemId' element={<ItemDetailContainer />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

