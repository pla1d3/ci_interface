import React from 'react'
import c from 'clsx'
import s from './index.css'

export default function Content ({ children, className }) {
  return (
    <div className={c(s.content, className)}>
      {children}
    </div>
  )
}
