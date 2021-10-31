import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Content from 'components/Content'
import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import Counter from 'performance/send'
import { CogIcon, PlayIcon } from 'icons'
import c from 'clsx'
import s from './index.css'

export default function Header () {
  const counter = useRef()
  const { pathname } = useLocation()
  const [visibleModal, setVisibleModal] = useState(false)
  const [commitHash, setCommitHash] = useState('')

  useEffect(()=> {
    counter.current = new Counter()
    counter.current.init(COUNTER_ID, localStorage.getItem('req_id'), 'header');
  }, [])

  function onShowModal () {
    setVisibleModal(true)

    const drawStart = Date.now();
    requestAnimationFrame(function() {
      counter.send('showModal', Date.now() - drawStart);
    })
  }

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
              onClick={onShowModal}
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
            <span className={s.buttonText}>Settings</span>
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
