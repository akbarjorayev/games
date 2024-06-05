import { useState, useRef, useEffect } from 'react'

import Button from '../../../components/Button/Button'
import AccountPageFriendsAlert from './AccountPageFriendsAlert'

import {
  addFollowing,
  addFollowers,
  removeFollowing,
  removeFollowers,
  isFollowed,
} from '../../../modules/friends.module'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'
import { useFirestore } from '../../../hooks/useFirestore'

const FOLLOW_STATUS = {
  loading: 'Loading',
  followed: 'Followed',
  notFollowed: 'NotFollowed',
  following: 'Following',
  unfollowing: 'Unfollowing',
}

export default function AccountPageFollow({ editable }) {
  const userID = useRef(window.location.pathname.split('users/')[1]).current
  const localID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [friends, setFriends] = useFirestore('friends', `${userID}`)
  const [friendsAlert, setFriendsAlert] = useState({
    show: false,
    showenFriends: '',
  })
  const [followed, setFollowed] = useState(FOLLOW_STATUS.loading)

  useEffect(() => {
    async function check() {
      const checked = await isFollowed(localID, userID)
      setFollowed(checked ? FOLLOW_STATUS.followed : FOLLOW_STATUS.notFollowed)
    }
    check()
  }, [])

  async function followAction() {
    if (followed === FOLLOW_STATUS.notFollowed) {
      setFollowed(FOLLOW_STATUS.following)
      await addFollowing(localID, userID)
      await addFollowers(userID, localID)

      setFriends((prev) => ({
        ...prev,
        followersAmount: (prev?.followersAmount || 0) + 1,
      }))
      setFollowed(FOLLOW_STATUS.followed)
    }

    if (followed === FOLLOW_STATUS.followed) {
      setFollowed(FOLLOW_STATUS.unfollowing)
      await removeFollowing(localID, userID)
      await removeFollowers(userID, localID)

      setFriends((prev) => ({
        ...prev,
        followersAmount: prev?.followersAmount - 1,
      }))
      setFollowed(FOLLOW_STATUS.notFollowed)
    }
  }

  function openFriendsAlert(e) {
    const type = e.target.getAttribute('type').trim()
    setFriendsAlert({ ...friendsAlert, show: true, showenFriends: type })
  }

  return (
    <div className="list_y">
      <div className="list_x">
        <button
          className="con blur_theme_bg blur_ha pd_tb_small scale_trns cur_pointer"
          type="followers"
          onClick={openFriendsAlert}
        >
          {friends?.followersAmount || '0'} followers
        </button>
        <button
          className="con blur_theme_bg blur_ha pd_tb_small scale_trns cur_pointer"
          type="following"
          onClick={openFriendsAlert}
        >
          {friends?.followingAmount || '0'} following
        </button>
      </div>
      {!editable && localID && (
        <>
          {(followed === FOLLOW_STATUS.loading ||
            followed === FOLLOW_STATUS.following ||
            followed === FOLLOW_STATUS.unfollowing) && (
            <Button className="btn_bd" disabled>
              {followed}
            </Button>
          )}
          {followed === FOLLOW_STATUS.notFollowed && (
            <Button className="btn_bd bd_cl_none btn_cl" onClick={followAction}>
              Follow
            </Button>
          )}
          {followed === FOLLOW_STATUS.followed && (
            <Button className="btn_bd _ha txt_red" onClick={followAction}>
              Unfollow
            </Button>
          )}
        </>
      )}
      {friendsAlert.show && (
        <AccountPageFriendsAlert
          showenFriends={friendsAlert.showenFriends}
          onHide={() => {
            setFriendsAlert({ ...friendsAlert, show: false })
          }}
        />
      )}
    </div>
  )
}
