import { useEffect, useState } from 'react'

import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/Input'

import { getPhoneNumber } from '../../utils/phoneNumber'
import {
  loadFromSession,
  saveToSession,
} from '../../../../js/db/local/sessionStorage'
import { goToHref } from '../../../../js/utils/href'
import { generateStrongPassword } from '../../../../js/utils/password'

export default function SignupUserData() {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
    show: false,
  })
  const [name, setName] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(
      !(
        name &&
        passwords.password &&
        passwords.password.length >= 6 &&
        passwords.password === passwords.confirmPassword
      )
    )
  }, [name, passwords.password, passwords.confirmPassword])

  function editPhoneNumber() {
    saveToSession('editPhoneNumber', true)
    goToHref('/account/signup/phone')
  }

  function save(e) {
    e.preventDefault()

    console.log(name, passwords)
  }

  return (
    <>
      <form className="list_y" onSubmit={save}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          label={
            <>
              Name <span className="txt_red">*</span>
            </>
          }
          maxLength="20"
        />
        <PasswordInputs passwords={passwords} setPasswords={setPasswords} />
        <Button className="btn_cl" disabled={disabled}>
          Save
        </Button>
      </form>
      <div className="con_bg_dr d_f_jc_sb d_f_ai_ce">
        <b>{getPhoneNumber(loadFromSession('phoneNumber'))}</b>
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
      <div className="input_area list_y">
        <label className="d_f_jc_sb" htmlFor="password">
          <div>
            Password <span className="txt_red">*</span>
          </div>
          <div
            className={`txt_${
              passwords.password.length < 6 ? 'red' : 'cl'
            } pd_tb_0 fz_small`}
          >
            6 characters minimum
          </div>
        </label>
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
