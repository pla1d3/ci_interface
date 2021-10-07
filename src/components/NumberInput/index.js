import React from 'react'
import c from 'clsx'
import s from './index.css'

export default function NumberInput ({
  classNameRoot,
  label,
  value,
  min,
  max,
  measure,
  onChange
}) {
  return (
    <div className={c(s.root, classNameRoot)}>
      <label className={s.label}>{label}</label>
      <input
        min={min}
        max={max}
        className={s.input}
        value={value}
        type="number"
        onChange={e=> onChange(e.target.value)}
        />
      <div className={s.measure}>{measure}</div>
    </div>
  )
}
