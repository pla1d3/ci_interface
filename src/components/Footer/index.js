import React from 'react'
import Content from 'components/Content'
import s from './index.css'

export default function Footer () {
  return (
    <footer className={s.footer}>
      <Content className={s.content}>
        <div className={s.nav}>
          <div className={s.navItem}>Support</div>
          <div className={s.navItem}>Learning</div>
          <div className={s.navItem}>Русская версия</div>
        </div>

        <div>© 2020 Simon</div>
      </Content>
    </footer>
  )
}
