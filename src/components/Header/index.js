import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Content from 'components/Content'
import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import { CogIcon, PlayIcon } from 'icons'
import c from 'clsx'
import s from './index.css'

export default function Header () {
  const { pathname } = useLocation()
  const [visibleModal, setVisibleModal] = useState(false)
  const [commitHash, setCommitHash] = useState('')

  return (
    <Content className={s.header}>
      {
        pathname !== '/history'
        ? <Link to='/' className={s.title}>School CI server</Link>
        : <div className={s.titleRepo}>philip1967/my-awesome-repo</div>
      }

      <div className={s.actions}>
        {
          pathname === '/history' &&
          <>
            <Button
              size="s"
              variant="minor"
              onClick={()=> setVisibleModal(true)}
              className={s.button}
            >
              <PlayIcon />
              <span className={s.buttonText}>Run build</span>
            </Button>
            <Button
              icon={<CogIcon />}
              variant="minor"
              to="/settings"
              className={s.button}
            />
          </>
        }

        {
          pathname === '/' &&
          <Button
            size="s"
            variant="minor"
            to="/settings"
            className={c(s.button)}
          >
            <CogIcon />
            {
              pathname !== '/history' &&
              <span className={s.buttonText}>Settings</span>
            }
          </Button>
        }
      </div>

      <Modal
        className={s.modal}
        title="New build"
        visible={visibleModal}
        confirmLabel="Run build"
        onConfirm={()=> alert('onConfirm')}
        onDismiss={()=> setVisibleModal(false)}
      >
        <span>Enter the commit hash which you</span>
        <Input
          classNameRoot={s.modalInput}
          placeholder="Commit hash"
          value={commitHash}
          onChange={v=> setCommitHash(v)}
        />
      </Modal>
    </Content>
  )
}
