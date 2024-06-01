import { useContext } from 'react'

import { NotificationsContext } from '../NotificationsContext'
import { NOTIFICATIONS_TYPES } from '../data/notificationsData'

export default function NotificationsFilter() {
  const { filter, setFilter } = useContext(NotificationsContext)

  return (
    <>
      <div className="con blur_theme_bg notification_con list_x">
        {Object.values(NOTIFICATIONS_TYPES).map((type) => {
          return (
            <FilterItem
              key={type}
              label={type}
              isActive={filter === type}
              onClick={() => setFilter(type)}
            />
          )
        })}
      </div>
    </>
  )
}

function FilterItem({ label, isActive, onClick }) {
  return (
    <>
      <div
        className={`con_bd_df blur_ha scale_trns cur_pointer pd_tb_small ${
          isActive ? 'bg_main' : ''
        }`}
        onClick={onClick}
      >
        {getLabel(label)}
      </div>
    </>
  )
}

function getLabel(label) {
  return (label[0].toUpperCase() + label.slice(1)).replaceAll('_', ' ')
}
