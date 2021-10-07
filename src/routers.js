import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Content } from 'components'
import { Start, Settings, History } from 'pages'

export default function Routers () {
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
