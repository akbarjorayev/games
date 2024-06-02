import { useContext, createContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../components/Button/Button'
import Avatar from '../../../components/Avatar/Avatar'
import Input from '../../../components/Input/Input'

import { editFirestore, loadFromFirestore } from '../../../js/db/db/firestore'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'
import {
  editAccountUsername,
  switchAccountToId,
} from '../../../modules/account.module'
import { toastData } from '../../../components/utils/toast'
import { goToHref } from '../../../js/utils/href'
import { useFirestoreAll } from '../../../hooks/useFirestore'
import { accountIsAtLimit } from '../../../status/status'

const AccountPageInfoContext = createContext()

export default function AccountPageInfo({ editable, account, setAccount }) {
  const [editingItem, setEditingItem] = useState(-1)
  const [accountSwitched, setAccountSwitched] = useState(false)

  const accountInfo = [
    {
      label: 'name',
      value: account?.user.name,
      icon: 'account_circle',
    },
    {
      label: 'username',
      value: account?.user.username,
      icon: 'alternate_email',
    },
    {
      label: 'phone_number',
      value: account?.user.phoneNumber,
      icon: 'call',
      disabled: true,
    },
  ]

  const triggerAccountSwitch = useCallback(() => {
    setAccountSwitched((prev) => !prev)
  }, [])

  return (
    <>
      {createPortal(
        <ToastContainer
          position={toastData.position}
          autoClose={toastData.autoClose}
          theme={toastData.theme}
          draggable
        />,
        document.body
      )}
      <AccountPageInfoContext.Provider
        value={{
          editable,
          accountInfo,
          account,
          setAccount,
          editingItem,
          accountSwitched,
          setEditingItem,
          triggerAccountSwitch,
        }}
      >
        <div className="list_y w_100">
          <div className="con blur_theme_bg list_y_small">
            <GetTop />
            <div className="line_x"></div>
            {accountInfo[editingItem] && editable ? (
              <GetEditingItem />
            ) : (
              <GetInfoItems />
            )}
          </div>
          {!accountInfo[editingItem] && editable && (
            <>
              <AccountPageAccountsList />
              {!accountIsAtLimit && (
                <Button
                  className="bg_none btn_bd_cl"
                  onClick={() => goToHref('/account/signup/phone')}
                >
                  Add account
                </Button>
              )}
            </>
          )}
        </div>
      </AccountPageInfoContext.Provider>
    </>
  )
}

function GetTop() {
  const { editable, accountInfo, editingItem, setEditingItem } = useContext(
    AccountPageInfoContext
  )

  return (
    <>
      <div className="d_f_jc_sb d_f_ai_ce fz_medium">
        {accountInfo[editingItem] && editable ? (
          <div
            className="con d_f_ce blur_theme_bg blur_ha scale_trns cur_pointer pd_small bd_50"
            onClick={() => setEditingItem(-1)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
        ) : (
          <NonVisibleBtn />
        )}
        <b>
          {accountInfo[editingItem] && editable
            ? getLabel(accountInfo[editingItem].label)
            : 'Account info'}
        </b>
        <NonVisibleBtn />
      </div>
    </>
  )

  function NonVisibleBtn() {
    return (
      <div className="con d_f_ce pd_small v_hidden">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
    )
  }
}

function GetInfoItems() {
  const { editable, accountInfo, setEditingItem } = useContext(
    AccountPageInfoContext
  )

  return (
    <>
      {accountInfo.map((info, i) => (
        <div
          key={i}
          className={`con list_x ${
            info.disabled || !editable ? '' : 'blur_ha scale_trns cur_pointer'
          }`}
          onClick={() => {
            if (!info.disabled) setEditingItem(i)
          }}
        >
          <div className="d_f_ce">
            <span className="material-symbols-outlined fz_medium_icon">
              {info.icon}
            </span>
          </div>
          <div className="list_y_small">
            <b>{info.value}</b>
            <div>{getLabel(info.label)}</div>
          </div>
        </div>
      ))}
    </>
  )
}

function AccountPageAccountsList() {
  const { accountSwitched } = useContext(AccountPageInfoContext)
  const { ids, active } = loadFromLocalStorage('games').accounts

  const [accounts] = useFirestoreAll(
    'accounts',
    ids.filter((id) => id !== active),
    accountSwitched
  )

  if (ids.length < 2) return null
  if (!accounts)
    return <div className="con d_f_ce blur_theme_bg">Accounts are loading</div>

  return (
    <>
      <div className="con blur_theme_bg list_y_small">
        {accounts?.map((acc) => {
          if (!acc) return null
          return <GetAccount key={acc.id} account={acc} />
        })}
      </div>
    </>
  )

  function GetAccount({ account }) {
    const { setAccount, triggerAccountSwitch } = useContext(
      AccountPageInfoContext
    )

    async function switchAccount() {
      const switchedAccount = await loadFromFirestore(
        'accounts',
        `${account.id}`
      )
      switchAccountToId(account.id)
      setAccount(switchedAccount)
      toast.success(
        <div>
          Account switched to <b>{switchedAccount.user.name}</b>
        </div>
      )

      triggerAccountSwitch()
    }

    return (
      <div
        className="con list_x blur_ha scale_trns cur_pointer"
        onClick={() => switchAccount()}
      >
        <Avatar letter={account?.user.name[0]} style={{ height: '40px' }} />
        <div className="list_y_small">
          <b>{account?.user.name}</b>
          <div className="fz_small">@{account?.user.username}</div>
        </div>
      </div>
    )
  }
}

const SAVE_BTN_TEXTS = {
  save: 'Save',
  saving: 'Saving',
}

function GetEditingItem() {
  const [saveBtnText, setSaveBtnText] = useState(SAVE_BTN_TEXTS.save)
  const { accountInfo, editingItem, account, setAccount, setEditingItem } =
    useContext(AccountPageInfoContext)
  const accountInfoValue = accountInfo[editingItem].value
  const [value, setValue] = useState(accountInfoValue)

  async function save(e) {
    e.preventDefault()
    setSaveBtnText(SAVE_BTN_TEXTS.saving)
    const id = window.location.pathname.split('users/')[1]

    if (accountInfo[editingItem].label === 'username') {
      const editUsername = await editAccountUsername(id, value)

      setSaveBtnText(SAVE_BTN_TEXTS.save)
      if (!editUsername.ok) return toast.error(editUsername.message)
    } else {
      await editFirestore('accounts', id, {
        user: { [accountInfo[editingItem].label]: value },
      })
    }

    setAccount({
      ...account,
      user: { ...account.user, [accountInfo[editingItem].label]: value },
    })
    setEditingItem(-1)
    toast.success('Changes saved')
  }

  function changeInput(e) {
    const { value: newValue } = e.target
    setValue(newValue)
  }

  return (
    <>
      <form
        className="list_y"
        onSubmit={save}
        disabled={saveBtnText === SAVE_BTN_TEXTS.saving}
      >
        <Input
          name={accountInfo[editingItem].label}
          value={value}
          onChange={changeInput}
          placeholder={getLabel(accountInfo[editingItem].label)}
          maxLength="20"
          autoFocus
        />
        <Button
          className="btn_cl"
          disabled={!value || value === accountInfoValue}
        >
          {saveBtnText}
        </Button>
      </form>
    </>
  )
}

function getLabel(label) {
  const l = label.replace(/_/g, ' ')
  return l[0].toUpperCase() + l.slice(1)
}
