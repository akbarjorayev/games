import { useRef, useState } from 'react'

import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'

import {
  getCorrectPhoneNumber,
  getPhoneNumber,
  isValidUzbekMobileNumber,
} from '../utils/phoneNumber'
import { goToHref } from '../../../js/utils/href'

import '../Account.css'
import '../../../components/Input/Input.css'

export default function Login() {
  const phoneNumberInput = useRef()
  const [inputsData, setInputsData] = useState({
    password: '',
    phone: '+998 ',
  })

  async function handleLogin(e) {
    e.preventDefault()
    inputsData.phone = getCorrectPhoneNumber(inputsData.phone, true)

    console.log(inputsData)
  }

  return (
    <>
      <div className="h_100 d_f_ce">
        <div className="con_bg_df account_con list_y">
          <div className="list_x d_f_ai_ce d_f_jc_sb">
            <b className="fz_medium d_f_ai_ce">Log in</b>
            <Button
              className="btn_cl"
              onClick={() => goToHref('/account/signup')}
            >
              Sign up
            </Button>
          </div>
          <div className="line_x line_dark"></div>
          <form className="list_y" onSubmit={handleLogin}>
            <div className="input_area">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                ref={phoneNumberInput}
                type="tel"
                id="phoneNumber"
                value={inputsData.phone}
                onChange={(e) =>
                  setInputsData({
                    ...inputsData,
                    phone: getPhoneNumber(e.target.value),
                  })
                }
                maxLength="17"
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
            <Button
              type="submit"
              className="btn_cl"
              disabled={
                !(
                  inputsData.password &&
                  isValidUzbekMobileNumber(inputsData.phone)
                )
              }
            >
              Log in
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
