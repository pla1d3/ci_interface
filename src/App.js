import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Routers from './Routers'
import rootReducer from './reducers'
import './index.css'

import { Header, Footer } from 'components'

const store = createStore(rootReducer)

export default function App () {
  return (
    <Provider store={store}>
      <Header />

      <main>
        <Routers />
      </main>

      <Footer />
    </Provider>
  )
}
