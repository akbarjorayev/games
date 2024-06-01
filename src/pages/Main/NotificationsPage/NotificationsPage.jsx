import { useEffect, useRef, useState } from 'react'

import NotificationsNo from './components/NotificationsNo'
import NotificationsFilter from './components/NotificationsFilter'
import NotificationsItem from './components/NotificationsItem'

import { useFirestore } from '../../../hooks/useFirestore'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'
import { NOTIFICATIONS_TYPES } from './data/notificationsData'
import { NotificationsContext } from './NotificationsContext'

import './NotificationsPage.css'

export default function NotificationsPage() {
  const id = useRef(loadFromLocalStorage('games').accounts.active)
  const [notifications, setNotifications] = useFirestore(
    'notifications',
    id.current
  )
  const [userNotifications, setUserNotifications] = useState(
    notifications?.notifications
  )
  const [filter, setFilter] = useState(NOTIFICATIONS_TYPES.all)

  useEffect(() => {
    const ns = notifications.notifications?.filter(
      (n) => n.type === filter || filter === NOTIFICATIONS_TYPES.all
    )
    setUserNotifications(ns)
  }, [filter, notifications])

  if (!notifications)
    return (
      <div className="h_100 d_f_ce">
        <div className="con mar_ce blur_theme_bg w_max">
          Notifications are loading
        </div>
      </div>
    )

  if (notifications.notifications.length === 0) return <NotificationsNo />

  return (
    <>
      <NotificationsContext.Provider
        value={{ notifications, setNotifications, filter, setFilter }}
      >
        <div className="h_100 d_f_ai_ce list_y">
          <NotificationsFilter />
          <div className="con blur_theme_bg notification_con list_y">
            {userNotifications?.length > 0 &&
              userNotifications.map((n, i) => (
                <NotificationsItem key={i} data={n} />
              ))}
            {userNotifications?.length === 0 && <NotificationsNo />}
          </div>
        </div>
      </NotificationsContext.Provider>
    </>
  )
}
