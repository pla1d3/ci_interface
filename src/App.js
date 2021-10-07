import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Header, Footer } from 'components'
import Routers from './routers'

export default function App () {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routers />
      </main>

      <Footer />
    </BrowserRouter>
  )
}
