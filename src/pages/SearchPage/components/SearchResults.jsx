import { useEffect, useState } from 'react'

import Avatar from '../../../components/Avatar/Avatar'

import { useFirestore } from '../../../hooks/useFirestore'
import { loadFromFirestore } from '../../../js/db/db/firestore'

export default function SearchResults({ value }) {
  const [accounts] = useFirestore('usernames', value.trim())

  return (
    <>
      {!accounts && <NoResult />}
      {accounts.id && <ShowResult accounts={accounts} />}
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
  const [accountsRes, setAccountsRes] = useState([])

  useEffect(() => {
    async function loadData() {
      const data = await Promise.all(
        [accounts].map((account) =>
          loadFromFirestore('accounts', `${account.id}`)
        )
      )
      setAccountsRes(data)
    }
    loadData()
  }, [accounts])

  return (
    <>
      <div className="list_y">
        {accountsRes?.map((acc) => {
          if (!acc) return null
          return <GetAccount key={acc.id} account={acc} />
        })}
      </div>
    </>
  )
}

function GetAccount({ account }) {
  return (
    <div className="con list_x blur_ha scale_trns cur_pointer">
      <Avatar letter={account?.user.name[0]} style={{ height: '40px' }} />
      <div className="list_y_small">
        <b>{account?.user.name}</b>
        <div className="fz_small">@{account?.user.username}</div>
      </div>
    </div>
  )
}
