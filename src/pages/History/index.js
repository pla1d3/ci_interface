import React, { useState } from 'react'
import {
  CalendarIcon,
  CommitIcon,
  UserIcon,
  ErrorIcon,
  TimeIcon,
  SuccessIcon,
  PendingIcon
} from 'icons'
import { Button } from 'components'
import dayjs from 'dayjs'
import c from 'clsx'
import data from './data.mock.json'
import s from './index.css'

const TYPE_ICONS = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  pending: <PendingIcon />
}

export default function History () {
  const [limit, setLimit] = useState(3)

  function onShowMore () {
    setLimit(limit + 3)
  }

  return (
    <div className={s.root}>
      <div className={s.list}>
        {
          data.slice(0, limit).map(item=> (
            <div className={s.card}>
              <div className={s.statusIcon}>
                  {TYPE_ICONS[item.status]}
              </div>

              <div className={s.content}>
                <div className={s.desc}>
                  <div className={s.title}>
                    <div className={c(s.id, s[item.status])}>#{item.id}</div>
                    <div>{item.title}</div>
                  </div>

                  <div className={s.info}>
                    <div className={s.branch}>
                      <CommitIcon className={s.icon} />
                      <span>{item.branch}</span>
                      <span className={s.hash}>{item.hash}</span>
                    </div>
                    <div className={s.user}>
                      <UserIcon className={s.icon} />
                      <span>{item.user}</span>
                    </div>
                  </div>
                </div>

                <div className={s.times}>
                  <div className={s.timesItem}>
                    <CalendarIcon className={s.icon} />
                    <span>{dayjs(item.createdAt).format('DD MMM, HH:mm')}</span>
                  </div>
                  <div className={s.timesItem}>
                    <TimeIcon className={s.icon} />
                    <span>1 ч 20 мин</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {
        limit < data.length &&
        <Button
          size="s"
          variant="minor"
          onClick={onShowMore}
        >Show more</Button>
      }
    </div>
  )
}
