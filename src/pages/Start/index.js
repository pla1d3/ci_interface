import React, { useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'components'
import { ToolsIcon } from 'icons'
import s from './index.css'

export default function Start () {
  const history = useHistory()

  useLayoutEffect(()=> {
    console.log('test 1')

    if (localStorage.getItem('settings')) {
      history.push('/history')
    }
  }, [])

  return (
    <div className={s.start}>
      <div className={s.alert}>
        <ToolsIcon className={s.alertIcon} />

        <div className={s.alertText}>
          Configure repository connection and synchronization settings
        </div>

        <Button to="/settings" className={s.alertButton}>
          Open settings
        </Button>
      </div>
    </div>
  )
}
