import { useRef } from 'react'

import Alert from '../../../components/Alert/Alert'
import Avatar from '../../../components/Avatar/Avatar'

import { useFirestore } from '../../../hooks/useFirestore'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'
import { sortFriends } from '../../../modules/friends.module'
import { prepareGame } from '../../../modules/game.module'

export default function GamePageFriendsAlert({
  link,
  onHide,
  setWaitingForRes,
}) {
  const userID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [friends] = useFirestore('friends', `${userID}`)
  const sortedFriends = sortFriends(friends.followers, friends.following)

  return (
    <>
      <Alert title="Choose friend to play with" onHide={onHide}>
        {!friends && <div className="con blur_theme_bg d_f_ce">Loading</div>}
        {friends && (!sortedFriends || sortedFriends?.length === 0) && (
          <div className="con blur_theme_bg d_f_ce">No friends</div>
        )}
        <div className="game_page_friends_alert_con">
          {friends &&
            (sortedFriends || sortedFriends?.length > 0) &&
            sortedFriends.map((f, i) => (
              <GetAccount
                key={i}
                fID={f}
                link={link}
                onHide={onHide}
                setWaitingForRes={setWaitingForRes}
              />
            ))}
        </div>
      </Alert>
    </>
  )
}

function GetAccount({ fID, link, onHide, setWaitingForRes }) {
  const [account] = useFirestore('accounts', `${fID}`)

  if (!account) return null

  async function startingGame() {
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
      >
        <Avatar letter={account?.user.name[0]} style={{ height: '40px' }} />
        <div className="list_y_small d_f_ai_start">
          <b>{account?.user.name}</b>
          <div className="fz_small">@{account?.user.username}</div>
        </div>
      </button>
    </>
  )
}
