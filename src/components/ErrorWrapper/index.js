import React from 'react'
import s from './index.css'

export default function ErrorWrapper ({
  err,
  className,
  children
}) {
  return (
    <div className={className}>
      {children}
      {err && <div className={s.err}>{err}</div>}
    </div>
  )
}
