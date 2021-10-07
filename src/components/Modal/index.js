import React from 'react'
import { createPortal } from 'react-dom'
import Button from 'components/Button'
import c from 'clsx'
import s from './index.css'

export default function Modal ({
  className,
  children,
  visible,
  title,
  cancelLabel,
  confirmLabel = 'Ok',
  onDismiss,
  onConfirm
}) {
  if (!visible) return null

  cancelLabel = cancelLabel || onConfirm ? 'Cancel' : 'Ok'

  function _onConfirm () {
    onConfirm()
    onDismiss()
  }

  const modal = (
    <>
      <div className={c(s.modal, className)}>
        {title && <div className={s.title}>{title}</div>}

        <div className={s.content}>{children}</div>

        <div className={s.actions}>
          {
            onConfirm &&
            <Button
              size='s'
              className={s.action}
              onClick={_onConfirm}
            >{confirmLabel}</Button>
          }
          {
            onDismiss &&
            <Button
              size='s'
              variant='minor'
              className={s.action}
              onClick={onDismiss}
            >{cancelLabel}</Button>
          }
        </div>
      </div>
      <div className={s.overlay} onClick={onDismiss} />
    </>
  )

  return createPortal(modal, document.getElementById('app'))
}
