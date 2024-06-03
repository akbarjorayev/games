import { useContext, useEffect, useRef, useState } from 'react'

import Menu from '../../components/Menu/Menu'
import NotificationsNo from './components/NotificationsNo'
import NotificationsFilter from './components/NotificationsFilter'
import NotificationsItem from './components/NotificationsItem'
import NotificationsWillbeFixed from './components/NotificationsWillbeFixed'

import { useFirestore } from '../../hooks/useFirestore'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'
import { NOTIFICATIONS_TYPES } from './data/notificationsData'
import { NotificationsContext } from './NotificationsContext'
import { loadFromFirestore } from '../../js/db/db/firestore'
import { readAllNotifications } from '../../modules/notifications.module'

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
  const [readAll, setReadAll] = useState(false)

  useEffect(() => {
    const ns = notifications.notifications?.filter(
      (n) => n?.type === filter || filter === NOTIFICATIONS_TYPES.all
    )
    setUserNotifications(ns)
  }, [filter, notifications])

  useEffect(() => {
    if (userNotifications?.length > 0 && !readAll) {
      readAllNotifications(id, notifications)
      setReadAll(true)
    }
  }, [readAll, userNotifications?.length, notifications])

  if (!notifications)
    return (
      <div className="con h_100 list_y">
        <Menu />
        <div className="con mar_ce blur_theme_bg w_max">
          Notifications are loading
        </div>
      </div>
    )

  return (
    <>
      <NotificationsContext.Provider
        value={{ id, notifications, setNotifications, filter, setFilter }}
      >
        <div className="con pos_full_page d_f_ai_ce list_y">
          <Menu />
          <NotificationsWillbeFixed />
          <NotificationsFilter />
          <div className="con blur_theme_bg notification_con list_y">
            <NotificationsTop />
            {userNotifications?.length > 0 &&
              userNotifications.map((n, i) => (
                <NotificationsItem key={i} data={n} />
              ))}
            {(userNotifications?.length === 0 ||
              notifications.notifications?.length === 0 ||
              !notifications.notifications) && <NotificationsNo />}
          </div>
        </div>
      </NotificationsContext.Provider>
    </>
  )
}

function NotificationsTop() {
  const { id, setNotifications } = useContext(NotificationsContext)

  async function loadNotifications() {
    const data = await loadFromFirestore('notifications', `${id.current}`)
    readAllNotifications(id.current, data)
    setNotifications(data)
  }

  return (
    <>
      <div className="list_x d_f_ai_ce d_f_jc_sb">
        <b className="fz_medium">Notifications</b>
        <div
          className="con d_f_ce blur_theme_bg blur_ha cur_pointer scale_trns bd_50 pd_small"
          onClick={loadNotifications}
        >
          <span className="material-symbols-outlined fz_small_icon">
            refresh
          </span>
        </div>
      </div>
      <div className="line_x"></div>
    </>
  )
}
