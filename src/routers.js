import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Content } from 'components'
import { Start, Settings, History } from 'pages'

export default function Routers () {
  useEffect(()=> {
    if (!localStorage.getItem('req_id')) {
      localStorage.setItem('req_id', String(Math.random()).substr(2, 12))
    }
  }, [])

  return (
    <Content>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/history" exact component={History} />
      </Switch>
    </Content>
  )
}
