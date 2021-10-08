import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, NumberInput, Input, ErrorWrapper } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { changeSettings } from 'actions'
import validate from 'validate.js'
import scheme from './sheme'
import s from './index.css'

export default function Settings () {
  const history = useHistory()
  const settings = useSelector(state => state.settings)
  const dispatch = useDispatch()
  const [data, setData] = useState(settings)
  const [errors, setErrors] = useState({})

  function onSubmit () {
    const errors = validate(data, scheme, { fullMessages: false })
    if (errors) return setErrors(errors)

    dispatch(changeSettings(data))
    history.push('/')
  }

  return (
    <div className={s.settings}>
      <h3 className={s.title}>Settings</h3>
      <p className={s.desc}>
        Configure repository connection and synchronization settings.
      </p>

      <form className={s.form}>
        <ErrorWrapper
          className={s.input}
          err={errors?.repository?.at(0)}
        >
          <Input
            label="GitHub repository *"
            placeholder="user-name/repo-name"
            value={data.repository}
            onChange={value=> setData({ ...data, repository: value })}
          />
        </ErrorWrapper>

        <ErrorWrapper
          className={s.input}
          err={errors?.buildCommand?.at(0)}
        >
          <Input
            label="Build command *"
            placeholder="npm run start"
            value={data.buildCommand}
            onChange={value=> setData({ ...data, buildCommand: value })}
          />
        </ErrorWrapper>

        <Input
          classNameRoot={s.input}
          label="Main branch"
          placeholder="master"
          value={data.mainBranch}
          onChange={value=> setData({ ...data, mainBranch: value })}
        />

        <NumberInput
          min={1}
          max={60}
          classNameRoot={s.input}
          label="Synchronize every"
          measure="minutes"
          value={data.syncEvery}
          onChange={value=> setData({ ...data, syncEvery: value })}
        />

        <div className={s.actions}>
          <Button className={s.button} onClick={onSubmit}>Save</Button>
          <Button
            className={s.button}
            onClick={history.goBack}
            variant='minor'
          >Cancel</Button>
        </div>
      </form>
    </div>
  )
}
