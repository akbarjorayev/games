import { useEffect, useState } from 'react'

import Avatar from '../../../components/Avatar/Avatar'

import { searchForAccounts } from '../utils/searchPage'
import { goToHref } from '../../../js/utils/href'

export default function SearchResults({ value }) {
  const [accounts, setAccounts] = useState(false)

  useEffect(() => {
    async function loadData() {
      const data = await searchForAccounts(value)
      setAccounts([data])
    }
    loadData()
  }, [])

  return (
    <>
      {!accounts && <NoResult />}
      {accounts?.length > 0 && <ShowResult accounts={accounts} />}
    </>
  )
}

function NoResult() {
  return (
    <>
      <div className="h_100 d_f_ce list_y">
        <span className="material-symbols-outlined fz_big_icon">
          do_not_disturb_on
        </span>
        <div>No result</div>
      </div>
    </>
  )
}

function ShowResult({ accounts }) {
  return (
    <>
      <div className="list_y">
        {accounts?.map((acc) => {
          if (!acc) return null
          return <GetAccount key={acc.id} account={acc} />
        })}
      </div>
    </>
  )
}

function GetAccount({ account }) {
  return (
    <button
      className="con list_x blur_ha scale_trns cur_pointer"
      onClick={() => goToHref(`/users/${account?.id}`)}
    >
      <Avatar letter={account?.user.name[0]} style={{ height: '40px' }} />
      <div className="list_y_small">
        <b>{account?.user.name}</b>
        <div className="fz_small">@{account?.user.username}</div>
      </div>
    </button>
  )
}
