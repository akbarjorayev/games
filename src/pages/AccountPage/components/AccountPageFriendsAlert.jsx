import { useRef } from 'react'

import Alert from '../../../components/Alert/Alert'
import Avatar from '../../../components/Avatar/Avatar'

import { useFirestore } from '../../../hooks/useFirestore'

export default function AccountPageFriendsAlert({
  showenFriends = 'following',
  onHide,
}) {
  const userID = useRef(window.location.pathname.split('users/')[1]).current
  const [friends] = useFirestore('friends', `${userID}`)

  return (
    <>
      <Alert
        title={getTitle(showenFriends)}
        onHide={onHide}
        conClassName="acc_page_friends_alert"
      >
        {!friends && <div className="con d_f_ce blur_theme_bg">Loading</div>}
        {friends && friends[showenFriends]?.length > 0 && (
          <div className="list_y_small acc_page_friends_alert_con scroll_y">
            {friends[showenFriends].map((id) => {
              return <GetAccount key={id} id={id} />
            })}
          </div>
        )}
        {friends &&
          (!friends[showenFriends] || friends[showenFriends]?.length === 0) && (
            <div className="con d_f_ce blur_theme_bg">
              There is no {showenFriends}
            </div>
          )}
      </Alert>
    </>
  )
}

function GetAccount({ id }) {
  const [account] = useFirestore('accounts', `${id}`)

  if (!account) return null

  return (
    <div className="con list_x con_ha scale_trns cur_pointer">
      <Avatar letter={account?.user.name[0]} style={{ height: '40px' }} />
      <div className="list_y_small">
        <b>{account?.user.name}</b>
        <div className="fz_small">@{account?.user.username}</div>
      </div>
    </div>
  )
}

function getTitle(showenFriends) {
  return showenFriends[0].toUpperCase() + showenFriends.slice(1)
}
