import { useState, useRef, useEffect } from 'react'

import Button from '../../../components/Button/Button'

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
  const [followed, setFollowed] = useState(FOLLOW_STATUS.loading)
  const userID = useRef(window.location.pathname.split('users/')[1]).current
  const localID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [friends, setFriends] = useFirestore('friends', `${userID}`)

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
      setFriends({ ...friends, followers: [...friends?.followers, localID] })
      setFollowed(FOLLOW_STATUS.followed)
    }

    if (followed === FOLLOW_STATUS.followed) {
      setFollowed(FOLLOW_STATUS.unfollowing)
      await removeFollowing(localID, userID)
      await removeFollowers(userID, localID)
      setFriends({
        ...friends,
        followers: friends?.followers.filter(
          (follower) => follower !== localID
        ),
      })
      setFollowed(FOLLOW_STATUS.notFollowed)
    }
  }

  return (
    <div className="list_y">
      <div className="list_x">
        <div className="con blur_theme_bg blur_ha pd_tb_small scale_trns cur_pointer">
          {friends?.followers?.length || '0'} followers
        </div>
        <div className="con blur_theme_bg blur_ha pd_tb_small scale_trns cur_pointer">
          {friends?.following?.length || '0'} following
        </div>
      </div>
      {!editable && (
        <>
          {(followed === FOLLOW_STATUS.loading ||
            followed === FOLLOW_STATUS.following ||
            followed === FOLLOW_STATUS.unfollowing) && (
            <Button disabled>{followed}</Button>
          )}
          {followed === FOLLOW_STATUS.notFollowed && (
            <Button className="btn_cl" onClick={followAction}>
              Follow
            </Button>
          )}
          {followed === FOLLOW_STATUS.followed && (
            <Button className="txt_red" onClick={followAction}>
              Unfollow
            </Button>
          )}
        </>
      )}
    </div>
  )
}
