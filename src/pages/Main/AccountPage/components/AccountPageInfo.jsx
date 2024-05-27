import { useContext, createContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { ToastContainer, toast } from 'react-toastify'

import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'

import { editFirestore } from '../../../../js/db/db/firestore'
import { loadFromLocalStorage } from '../../../../js/db/local/localStorage'
import { editAccountUsername } from '../../../../modules/account.module'
import { toastData } from '../../../../components/utils/toast'

const AccountPageInfoContext = createContext()

export default function AccountPageInfo({ account, setAccount }) {
  const [editingItem, setEditingItem] = useState(-1)

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

  return (
    <>
      <AccountPageInfoContext.Provider
        value={{
          accountInfo,
          account,
          setAccount,
          editingItem,
          setEditingItem,
        }}
      >
        <div className="con_bg_none account_info_con blur_theme_bg list_y_small">
          <GetTop />
          <div className="line_x"></div>
          {accountInfo[editingItem] ? <GetEditingItem /> : <GetInfoItems />}
        </div>
      </AccountPageInfoContext.Provider>
    </>
  )
}

function GetTop() {
  const { accountInfo, editingItem, setEditingItem } = useContext(
    AccountPageInfoContext
  )

  return (
    <>
      <div className="d_f_jc_sb d_f_ai_ce fz_medium">
        {accountInfo[editingItem] ? (
          <div
            className="con_bg_none d_f_ce blur_theme_bg blur_ha scale_trns cur_pointer pd_small bd_50"
            onClick={() => setEditingItem(-1)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
        ) : (
          <NonVisibleBtn />
        )}
        <b>
          {accountInfo[editingItem]
            ? getLabel(accountInfo[editingItem].label)
            : 'Account info'}
        </b>
        <NonVisibleBtn />
      </div>
    </>
  )

  function NonVisibleBtn() {
    return (
      <div className="con_bg_none d_f_ce pd_small v_hidden">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
    )
  }
}

function GetInfoItems() {
  const { accountInfo, setEditingItem } = useContext(AccountPageInfoContext)

  return (
    <>
      {accountInfo.map((info, i) => (
        <div
          key={i}
          className={`con_bg_none list_x ${
            info.disabled ? '' : 'blur_ha scale_trns cur_pointer'
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
    const id = loadFromLocalStorage('games').accounts.active

    if (accountInfo[editingItem].label === 'username') {
      const editUsername = await editAccountUsername(id, value)

      setSaveBtnText(SAVE_BTN_TEXTS.save)
      if (!editUsername.ok) return toast.error(editUsername.message)

      setEditingItem(-1)
      return
    }

    await editFirestore('accounts', id, {
      user: { [accountInfo[editingItem].label]: value },
    })

    setAccount({
      ...account,
      user: { ...account.user, [accountInfo[editingItem].label]: value },
    })
    setEditingItem(-1)
  }

  function changeInput(e) {
    const { value: newValue } = e.target
    setValue(newValue)
  }

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
