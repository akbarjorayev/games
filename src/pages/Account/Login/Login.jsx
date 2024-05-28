import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'

import {
  getCorrectPhoneNumber,
  getPhoneNumber,
  isValidUzbekMobileNumber,
} from '../utils/phoneNumber'
import { goToHref } from '../../../js/utils/href'
import { loginAccount } from '../../../modules/account.module'
import { toastData } from '../../../components/utils/toast'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'

import '../Account.css'
import '../../../components/Input/Input.css'

const LOGINBTNTEXTS = {
  login: 'Login',
  logging: 'Logging in',
}

export default function Login() {
  const phoneOrUsernameInput = useRef()
  const [inputsData, setInputsData] = useState({
    password: '',
    phoneOrUsername: '',
  })
  const [disabled, setDisabled] = useState(true)
  const [loginBtnText, setLoginBtnText] = useState(LOGINBTNTEXTS.login)
  const hasAccount = useRef(loadFromLocalStorage('games').accounts.active)

  useEffect(() => {
    const numberStatus = willbeNumber(inputsData.phoneOrUsername)
      ? inputsData.phoneOrUsername.length > 4 &&
        isValidUzbekMobileNumber(inputsData.phoneOrUsername)
      : true

    setDisabled(
      !(inputsData.password && inputsData.phoneOrUsername && numberStatus)
    )
  }, [inputsData.password, inputsData.phoneOrUsername])

  async function handleLogin(e) {
    e.preventDefault()
    setLoginBtnText(LOGINBTNTEXTS.logging)

    const phoneOrUsername = willbeNumber(inputsData.phoneOrUsername)
      ? 'phoneNumber'
      : 'username'

    const phoneOrUsernameValue =
      phoneOrUsername === 'phoneNumber'
        ? getCorrectPhoneNumber(inputsData.phoneOrUsername, true)
        : inputsData.phoneOrUsername

    const loggedIn = await loginAccount(
      phoneOrUsernameValue,
      inputsData.password,
      phoneOrUsername
    )

    if (!loggedIn.ok) {
      toast.error(loggedIn.message)
      setLoginBtnText(LOGINBTNTEXTS.login)
      return
    }

    toast.success(loggedIn.message)
    setLoginBtnText(LOGINBTNTEXTS.login)
    goToHref('/')
  }

  function changePhoneOrUsername(e) {
    const { value } = e.target

    if (willbeNumber(value)) {
      setInputsData({
        ...inputsData,
        phoneOrUsername: getPhoneNumber(value),
      })
    } else {
      setInputsData({
        ...inputsData,
        phoneOrUsername: value,
      })
    }
  }

  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      <div className="h_100 d_f_ce">
        <div className="account_con list_y">
          <div className="con_bg_df list_y">
            <div className="list_x d_f_ai_ce d_f_jc_sb">
              <b className="fz_medium d_f_ai_ce">Log in</b>
              <Button
                className="btn_cl"
                onClick={() => goToHref('/account/signup/phone')}
              >
                Sign up
              </Button>
            </div>
            <div className="line_x line_color"></div>
            <form
              className="list_y"
              onSubmit={handleLogin}
              disabled={loginBtnText === LOGINBTNTEXTS.logging}
            >
              <div className="input_area">
                <label htmlFor="phoneNumber">Phone number or username</label>
                <input
                  ref={phoneOrUsernameInput}
                  type="text"
                  id="phoneNumber"
                  value={inputsData.phoneOrUsername}
                  onChange={changePhoneOrUsername}
                  maxLength="20"
                  autoFocus
                />
              </div>
              <Input
                label="Password"
                type="password"
                onChange={(e) =>
                  setInputsData({
                    ...inputsData,
                    password: e.target.value,
                  })
                }
              />
              <Button type="submit" className="btn_cl" disabled={disabled}>
                {loginBtnText}
              </Button>
            </form>
          </div>
          {hasAccount.current && (
            <Button className="btn_cl" onClick={() => goToHref('/')}>
              Home page
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

function willbeNumber(string) {
  if (string === '+') return true
  return /^\d+$/.test(
    string.replaceAll('+', '').replaceAll('-', '').replaceAll(' ', '')
  )
}
