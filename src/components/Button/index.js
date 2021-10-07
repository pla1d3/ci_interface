import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import c from 'clsx'
import s from './index.css'

export default function Button ({
  children,
  style,
  className,
  to,
  disabled,
  variant,
  size,
  icon,
  onClick
}) {
  const prepareProps = {
    style,
    className: c([
      s.button,
      s[variant],
      s[size],
      s[disabled],
      { [s.iconOnly]: icon && !children },
      className
    ]),
    onClick: disabled ? null : onClick
  }

  const prepareChildren = (
    <>
      {!!icon && <div className={s.icon}>{icon}</div>}
      {
        typeof children === 'string'
          ? <span>{children}</span>
          : children
      }
    </>
  )

  if (to && !disabled) {
    return <Link {...prepareProps} to={to}>{prepareChildren}</Link>
  }

  return <div {...prepareProps}>{prepareChildren}</div>
}

Button.defaultProps = {
  disabled: false,
  variant: 'basic',
  size: 'm'
}

Button.propTypes = {
  icon: PropTypes.element,
  variant: PropTypes.oneOf(['basic', 'minor']),
  size: PropTypes.oneOf(['s', 'm', 'l'])
}
