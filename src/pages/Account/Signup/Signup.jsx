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
  send: 'Next',
  sending: 'Sending',
  verify: 'Verify',
  verifing: 'Verifing',
}

const SHOWENFORM = {
  phone: 'phone',
  verify: 'verify',
}

export default function Signup() {
  const phoneNumberInput = useRef()
  const [wrongOTP, setWrongOTP] = useState(false)
  const [showenForm, setShowenForm] = useState(SHOWENFORM.phone)
  const [numbers, setNumbers] = useState({ phone: '+998 ', verify: '' })
  const [btnTexts, setBtnTexts] = useState({
    send: BTNTEXTS.send,
    verify: BTNTEXTS.verify,
  })

  async function next(e) {
    e.preventDefault()

    setBtnTexts({ ...btnTexts, send: BTNTEXTS.sending })
    const sent = await sendSMS(numbers.phone)

    if (!sent) {
      toast.error('Something went wrong')
      setBtnTexts({ ...btnTexts, send: BTNTEXTS.send })
      return
    }

    toast.success('SMS sent')
    setShowenForm(SHOWENFORM.verify)
    setNumbers({ ...numbers, verify: '' })
    setBtnTexts({ ...btnTexts, send: BTNTEXTS.send })
  }

  async function verify(e) {
    e.preventDefault()

    setBtnTexts({ ...btnTexts, verify: BTNTEXTS.verifing })
    const verified = await verifySMS(numbers.phone, numbers.verify)

    if (!verified) {
      toast.error('Wrong OTP')
      setWrongOTP(true)
      setNumbers({ ...numbers, verify: '' })
      setBtnTexts({ ...btnTexts, verify: BTNTEXTS.verify })
      return
    }

    toast.success('OTP Verified')
    setBtnTexts({ ...btnTexts, verify: BTNTEXTS.verify })
  }

  function handleSetVerify(verify) {
    setNumbers({ ...numbers, verify })
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
                disabled={btnTexts.send === BTNTEXTS.sending}
              >
                <div className="input_area">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    ref={phoneNumberInput}
                    type="tel"
                    id="phoneNumber"
                    value={numbers.phone}
                    onChange={(e) =>
                      setNumbers({
                        ...numbers,
                        phone: getPhoneNumber(e.target.value),
                      })
                    }
                    maxLength="17"
                  />
                </div>
                <Button
                  type="submit"
                  className="btn_cl"
                  disabled={!isValidUzbekMobileNumber(numbers.phone)}
                >
                  {btnTexts.send}
                </Button>
              </form>
            </div>
          )}
          {showenForm === SHOWENFORM.verify && (
            <div className="verify_number_area">
              <form
                className="list_y"
                onSubmit={verify}
                disabled={btnTexts.verify === BTNTEXTS.verifing}
              >
                <div className="con_bg_dr d_f_jc_sb d_f_ai_ce">
                  <div>{getPhoneNumber(numbers.phone)}</div>
                  <Button
                    type="button"
                    onClick={() => setShowenForm(SHOWENFORM.phone)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="input_area">
                  <OTPInput
                    amount={6}
                    setVerify={handleSetVerify}
                    pastedWrongOTP={() => toast.error('Pasted wrong OTP')}
                    error={wrongOTP}
                    setError={setWrongOTP}
                  />
                </div>
                <Button
                  type="submit"
                  className="btn_cl"
                  onClick={verify}
                  disabled={!/^\d{6}$/.test(numbers.verify)}
                >
                  {btnTexts.verify}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
