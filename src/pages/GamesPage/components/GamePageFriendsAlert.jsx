import { createContext, useContext, useRef, useState } from 'react'

import Alert from '../../../components/Alert/Alert'
import Avatar from '../../../components/Avatar/Avatar'

import { useFirestore } from '../../../hooks/useFirestore'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'
import { sortFriends } from '../../../modules/friends.module'
import { prepareGame } from '../../../modules/game.module'
import { goToHref } from '../../../js/utils/href'

const FRIENDS_STATUS = {
  default: 'default',
  preparing: 'preparing',
}

const gamePageFriendsContext = createContext()

export default function GamePageFriendsAlert({
  link,
  onHide,
  setWaitingForRes,
}) {
  const userID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [friends] = useFirestore('friends', `${userID}`)
  const [status, setStatus] = useState(FRIENDS_STATUS.default)
  const sortedFriends = sortFriends(friends.followers, friends.following)

  return (
    <>
      <gamePageFriendsContext.Provider
        value={{ link, onHide, setWaitingForRes, status, setStatus }}
      >
        <Alert title="Choose friend to play with" onHide={onHide}>
          <div
            className="con blur_theme_bg pd_small d_f_ce lh_1 bd_cl_d scale_trns cur_pointer"
            onClick={() => goToHref('/search')}
          >
            <span className="material-symbols-outlined fz_small_icon">
              search
            </span>
            <span>Search for friends</span>
          </div>
          {!friends && <div className="con blur_theme_bg d_f_ce">Loading</div>}
          {friends && (!sortedFriends || sortedFriends?.length === 0) && (
            <div className="con blur_theme_bg d_f_ce">No friends</div>
          )}
          <div
            className="game_page_friends_alert_con scroll_y"
            disabled={status === FRIENDS_STATUS.preparing}
          >
            {friends &&
              (sortedFriends || sortedFriends?.length > 0) &&
              sortedFriends.map((f, i) => <GetAccount key={i} fID={f} />)}
          </div>
        </Alert>
      </gamePageFriendsContext.Provider>
    </>
  )
}

function GetAccount({ fID }) {
  const [account] = useFirestore('accounts', `${fID}`)
  const { link, onHide, setWaitingForRes, status, setStatus } = useContext(
    gamePageFriendsContext
  )

  if (!account) return null

  async function startingGame() {
    setStatus(FRIENDS_STATUS.preparing)
    await prepareGame(fID, link)

    onHide()
    setWaitingForRes({ name: account?.user.name })
  }

  return (
    <>
      <button
        className="con list_x blur_ha scale_trns cur_pointer w_100"
        tabIndex="0"
        onClick={startingGame}
        status={status}
      >
        <Avatar
          letter={account?.user.name[0]}
          id={account?.id}
          style={{ height: '40px' }}
        />
        <div className="list_y_small d_f_ai_start">
          <b>{account?.user.name}</b>
          <div className="fz_small">@{account?.user.username}</div>
        </div>
      </button>
    </>
  )
}
