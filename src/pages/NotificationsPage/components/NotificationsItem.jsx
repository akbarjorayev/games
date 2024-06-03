import { useContext, useEffect, useRef, useState } from 'react'

import Button from '../../../components/Button/Button'

import { NotificationsContext } from '../NotificationsContext'
import { removeNotification } from '../../../modules/notifications.module'
import { NOTIFICATIONS_TYPES } from '../data/notificationsData'

export default function NotificationsItem({ data }) {
  const { notifications, setNotifications } = useContext(NotificationsContext)
  const date = useRef(new Date(data.date))
  const [remove, setRemove] = useState(false)

  useEffect(() => {
    async function removeN() {
      if (remove) {
        const newNs = await removeNotification(data.id)
        setNotifications({ ...notifications, notifications: newNs })

        data.removed = true
        setRemove(false)
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
        className="con blur_theme_bg notification_item list_y"
        onWheel={swipe}
        removed={remove ? 'removed' : ''}
        new={data.new ? 'new' : ''}
      >
        <div className="d_f_jc_sb">
          <div>
            <b>{data?.title}</b>
            <div className="fz_small">{data?.description}</div>
          </div>
          <div className="fz_small txt_opa">
            {date.current.getHours()}:{date.current.getMinutes()}
          </div>
        </div>
        {(data.type === NOTIFICATIONS_TYPES.frReqs ||
          data.type === NOTIFICATIONS_TYPES.playReqs) && (
          <>
            <div className="line_x"></div>
            <div className="list_x w_100_child">
              <Button className="txt_red">Deny</Button>
              <Button className="btn_cl">Accept</Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
