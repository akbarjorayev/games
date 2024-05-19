import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../components/Button/Button'
import OTPInput from '../../../components/Input/OTPInput'

import { goToHref } from '../../../js/utils/href'
import { getPhoneNumber, isValidUzbekMobileNumber } from '../utils/phoneNumber'
import { sendSMS, verifySMS } from '../../../js/db/SMS'
import { toastData } from '../../../components/utils/toast'

import '../Account.css'
import '../../../components/Input/Input.css'

const BTNTEXTS = {
  phone: 'Next',
  sending: 'SMS is sending',
  verify: 'Verify',
  verifing: 'Verifing',
}

const SHOWENFORM = {
  phone: 'phone',
  verify: 'verify',
}

export default function Signup() {
  const phoneNumberRef = useRef()
  const [phoneNumber, setPhoneNumber] = useState('+998 ')
  const [verifyNumber, setVerifyNumber] = useState('')
  const [wrongOTP, setWrongOTP] = useState(false)
  const [phoneBtnText, setPhoneBtnText] = useState(BTNTEXTS.phone)
  const [verifyBtnText, setVerifyBtnText] = useState(BTNTEXTS.verify)
  const [showenForm, setShowenForm] = useState(SHOWENFORM.phone)

  async function next(e) {
    e.preventDefault()

    const userPhoneNumber = phoneNumber.replaceAll('-', '').replaceAll(' ', '')
    const validNumber = isValidUzbekMobileNumber(userPhoneNumber)

    if (!validNumber) {
      phoneNumberRef.current.focus()
      phoneNumberRef.current.classList.add('error')
      return
    }

    setPhoneBtnText(BTNTEXTS.sending)
    const sent = await sendSMS(userPhoneNumber)

    if (!sent) {
      toast.error('Something went wrong')
      setPhoneBtnText(BTNTEXTS.phone)
      return
    }

    toast.success('SMS sent')
    setPhoneBtnText(BTNTEXTS.phone)
    setShowenForm(SHOWENFORM.verify)
  }

  async function verify(e) {
    e.preventDefault()

    if (!/^\d{6}$/.test(verifyNumber)) {
      toast.error('Invalid OTP')
      setWrongOTP(true)
      return
    }

    setVerifyBtnText(BTNTEXTS.verifing)
    const verified = await verifySMS(phoneNumber, verifyNumber)

    if (!verified) {
      toast.error('Wrong OTP')
      setWrongOTP(true)
      setVerifyBtnText(BTNTEXTS.verify)
      return
    }

    toast.success('OTP Verified')
    setVerifyBtnText(BTNTEXTS.verify)
  }

  function edit() {
    setShowenForm(SHOWENFORM.phone)
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
        <div className="con_bg_df account_con list_y">
          <div className="list_x d_f_ai_ce d_f_jc_sb">
            <b className="fz_medium d_f_ai_ce">Sign up</b>
            <Button
              className="btn_cl"
              onClick={() => goToHref('/account/login')}
            >
              Log in
            </Button>
          </div>
          <div className="line_x line_dark"></div>
          {showenForm === SHOWENFORM.phone && (
            <div className="phone_number_area">
              <form
                className="list_y"
                onSubmit={next}
                disabled={phoneBtnText === BTNTEXTS.sending}
              >
                <div className="input_area">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    ref={phoneNumberRef}
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(getPhoneNumber(e.target.value))
                      phoneNumberRef.current.classList.remove('error')
                    }}
                    maxLength="17"
                  />
                </div>
                <Button type="submit" className="btn_cl">
                  {phoneBtnText}
                </Button>
              </form>
            </div>
          )}
          {showenForm === SHOWENFORM.verify && (
            <div className="verify_number_area">
              <form
                className="list_y"
                onSubmit={verify}
                disabled={verifyBtnText === BTNTEXTS.verifing}
              >
                <div className="con_bg_dr d_f_jc_sb d_f_ai_ce">
                  <div>{getPhoneNumber(phoneNumber)}</div>
                  <Button type="button" onClick={edit}>
                    Edit
                  </Button>
                </div>
                <div className="input_area">
                  <OTPInput
                    amount={6}
                    setVerify={setVerifyNumber}
                    pastedWrongOTP={() => toast.error('Pasted wrong OTP')}
                    error={wrongOTP}
                    setError={setWrongOTP}
                  />
                </div>
                <Button type="submit" className="btn_cl" onClick={verify}>
                  {verifyBtnText}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
