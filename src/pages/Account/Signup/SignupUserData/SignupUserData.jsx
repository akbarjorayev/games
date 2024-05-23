import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/Input'

import { getCorrectPhoneNumber, getPhoneNumber } from '../../utils/phoneNumber'
import {
  loadFromSession,
  saveToSession,
} from '../../../../js/db/local/sessionStorage'
import { goToHref } from '../../../../js/utils/href'
import { generateStrongPassword } from '../../../../js/utils/password'
import { createAccount } from '../../../../modules/account.module'
import { toastData } from '../../../../components/utils/toast'

const SAVEBTNTEXTS = {
  save: 'Save',
  saving: 'Saving',
}

export default function SignupUserData() {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
    show: false,
  })
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [saveBtnText, setSaveBtnText] = useState(SAVEBTNTEXTS.save)

  useEffect(() => {
    setDisabled(
      !(
        username &&
        passwords.password &&
        passwords.password.length >= 6 &&
        passwords.password === passwords.confirmPassword
      )
    )
  }, [username, passwords.password, passwords.confirmPassword])

  function editPhoneNumber() {
    saveToSession('editPhoneNumber', true)
    saveToSession('userIsFillingForm', true)
    goToHref('/account/signup/phone')
  }

  async function save(e) {
    e.preventDefault()
    setSaveBtnText(SAVEBTNTEXTS.saving)

    const phoneNumber = getCorrectPhoneNumber(
      loadFromSession('phoneNumber'),
      true
    )
    if (!phoneNumber) {
      toast.error('Invalid phone number')
      setSaveBtnText(SAVEBTNTEXTS.save)
      return
    }

    const accountCreated = await createAccount({
      name,
      username,
      phoneNumber,
      password: passwords.password,
    })

    if (!accountCreated.ok) {
      toast.error(accountCreated.message)
      setSaveBtnText(SAVEBTNTEXTS.save)
      return
    }

    toast.success(accountCreated.message)
    setSaveBtnText(SAVEBTNTEXTS.save)
  }

  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      <form
        className="list_y"
        onSubmit={save}
        disabled={saveBtnText === SAVEBTNTEXTS.saving}
      >
        <Input
          id="name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          label="Name"
          maxLength="20"
        />
        <Input
          id="username"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          label={
            <>
              Username <span className="txt_red">*</span>
            </>
          }
          maxLength="20"
        />
        <PasswordInputs passwords={passwords} setPasswords={setPasswords} />
        <Button className="btn_cl" disabled={disabled}>
          {saveBtnText}
        </Button>
      </form>
      <div className="con_bg_dr d_f_jc_sb d_f_ai_ce">
        <b>{getPhoneNumber(loadFromSession('phoneNumber')) || 'Unknown'}</b>
        <Button type="button" onClick={editPhoneNumber}>
          Edit
        </Button>
      </div>
    </>
  )
}

function PasswordInputs({ passwords, setPasswords }) {
  function setStrongPassword() {
    const strongPassword = generateStrongPassword(8)
    setPasswords({
      ...passwords,
      password: strongPassword,
      confirmPassword: strongPassword,
    })
  }

  return (
    <>
      <div className="input_area">
        <div className="d_f_jc_sb">
          <label htmlFor="password">
            Password <span className="txt_red">*</span>
          </label>
          <div
            className={`txt_${
              passwords.password.length < 6 ? 'red' : 'cl'
            } pd_tb_0 fz_small`}
          >
            6 characters minimum
          </div>
        </div>
        <div className="list_x">
          <input
            id="password"
            value={passwords.password}
            type={passwords.show ? 'text' : 'password'}
            onChange={(e) =>
              setPasswords({ ...passwords, password: e.target.value })
            }
          />
          <Button
            type="button"
            className="d_f_ce"
            onClick={() =>
              setPasswords({ ...passwords, show: !passwords.show })
            }
          >
            <span className="material-symbols-outlined">
              visibility{passwords.show ? '_off' : ''}
            </span>
          </Button>
          <Button type="button" className="d_f_ce" onClick={setStrongPassword}>
            <span className="material-symbols-outlined">encrypted</span>
          </Button>
        </div>
      </div>
      <div className="input_area">
        <label htmlFor="confirmPassword">
          Confirm password <span className="txt_red">*</span>
        </label>
        <div className="list_x">
          <input
            id="confirmPassword"
            value={passwords.confirmPassword}
            type={passwords.show ? 'text' : 'password'}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
          />
          <Button
            type="button"
            className="d_f_ce"
            onClick={() =>
              setPasswords({ ...passwords, show: !passwords.show })
            }
          >
            <span className="material-symbols-outlined">
              visibility{passwords.show ? '_off' : ''}
            </span>
          </Button>
        </div>
      </div>
    </>
  )
}
