import { useContext, useEffect, useRef, useState } from 'react'

import { NotificationsContext } from '../NotificationsContext'
import { removeNotification } from '../../../../modules/notifications.module'

export default function NotificationsItem({ data }) {
  const { notifications, setNotifications } = useContext(NotificationsContext)
  const date = useRef(new Date(data.date))
  const [remove, setRemove] = useState(false)

  useEffect(() => {
    async function removeN() {
      if (remove) {
        const newNs = await removeNotification(data.id, notifications)
        setNotifications({ ...notifications, notifications: newNs })

        data.removed = true
      }
    }
    removeN()
  }, [remove, data, notifications, setNotifications])

  function swipe(e) {
    if (e.deltaX > 50 && !remove) setRemove(true)
  }

  return (
    <>
      <div
        className="con blur_theme_bg notification_item"
        onWheel={swipe}
        removed={remove ? 'removed' : ''}
      >
        <div className="d_f_jc_sb">
          <div>
            <b>{data.title}</b>
            <div className="fz_small">{data.description}</div>
          </div>
          <div className="fz_small txt_opa">
            {date.current.getHours()}:{date.current.getMinutes()}
          </div>
        </div>
      </div>
    </>
  )
}
