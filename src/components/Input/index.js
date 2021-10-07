import React from 'react'
import { CancelIcon } from 'icons'
import c from 'clsx'
import s from './index.css'

export default function Input ({
  classNameRoot,
  classNameLabel,
  classNameWrapper,
  classNameInput,
  label,
  placeholder,
  value,
  onChange
}) {
  return (
    <div className={classNameRoot}>
      {
        label &&
        <label className={c(s.label, classNameLabel)}>
          {label}
        </label>
      }

      <div className={c(s.wrapper, classNameWrapper)}>
        {
          value &&
          <div
            className={s.actionClear}
            onClick={()=> onChange('')}
          >
            <CancelIcon />
          </div>
        }

        <input
          className={c(s.input, classNameInput)}
          placeholder={placeholder}
          value={value}
          onChange={e=> onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
