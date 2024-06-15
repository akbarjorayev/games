import {
  addToArrayFirestore,
  editFirestore,
  incrementField,
  loadFromFirestore,
} from '../js/db/db/firestore'
import { NOTIFICATIONS_TYPES } from '../pages/NotificationsPage/data/notificationsData'
import { sendNotification } from './notifications.module'

export async function addFollowing(userID, followingID) {
  await addToArrayFirestore(
    'friends',
    `${userID}`,
    'following',
    `${followingID}`
  )
  await incrementField('friends', `${followingID}`, 'followersAmount', 1)
}

export async function removeFollowing(userID, followingID) {
  const { following } = await loadFromFirestore('friends', `${userID}`)
  if (following?.length === 0) return

  const newFollowing = following?.filter((fID) => `${fID}` !== `${followingID}`)
  await editFirestore('friends', `${userID}`, { following: newFollowing })
  await incrementField('friends', `${followingID}`, 'followersAmount', -1)
}

export async function addFollowers(userID, followersID) {
  await addToArrayFirestore(
    'friends',
    `${userID}`,
    'followers',
    `${followersID}`
  )
  await incrementField('friends', `${followersID}`, 'followingAmount', 1)

  const account = await loadFromFirestore('accounts', `${followersID}`)
  await sendNotification(`${userID}`, {
    title: `New Follower @${account?.user?.username}`,
    description: `You have a new follower from @${account?.user?.name}`,
    type: NOTIFICATIONS_TYPES.frReqs,
    from: followersID,
  })
}

export async function removeFollowers(userID, followersID) {
  const { followers } = await loadFromFirestore('friends', `${userID}`)
  if (followers?.length === 0) return

  const newFollowers = followers?.filter((fID) => `${fID}` !== `${followersID}`)
  await editFirestore('friends', `${userID}`, { followers: newFollowers })
  await incrementField('friends', `${followersID}`, 'followingAmount', -1)
}

export async function isFollowed(userID, friendID) {
  const { following } = await loadFromFirestore('friends', `${userID}`)

  if (following?.length === 0) return false
  return following?.includes(`${friendID}`)
}

export function sortFriends(followers, following) {
  const followersSet = new Set(followers)
  const followingSet = new Set(following)

  const friends = [...followersSet].filter((user) => followingSet.has(user))
  return friends
}
