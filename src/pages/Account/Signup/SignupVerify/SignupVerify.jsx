import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../../components/Button/Button'
import OTPInput from '../../../../components/Input/OTPInput'

import { sendSMS, verifySMS } from '../../../../js/db/db/SMS'
import { getPhoneNumber } from '../../utils/phoneNumber'
import { toastData } from '../../../../components/utils/toast'
import {
  loadFromSession,
  saveToSession,
} from '../../../../js/db/local/sessionStorage'
import { goToHref } from '../../../../js/utils/href'

const BTNTEXTS = {
  verify: 'Verify',
  verifing: 'Verifing',
  resend: 'Resend SMS',
  resending: 'Resending SMS',
}

export default function SignupVerify() {
  const [wrongOTP, setWrongOTP] = useState(false)
  const [timer, setTimer] = useState(60)
  const [numbers, setNumbers] = useState({
    phone: loadFromSession('phoneNumber') || '+998 ',
    verify: '',
  })
  const [btnTexts, setBtnTexts] = useState({
    verify: BTNTEXTS.verify,
    resend: BTNTEXTS.resend,
  })

  useEffect(() => {
    if (+timer <= 0) return

    const interval = setInterval(() => setTimer(timer - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

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

    toast.success('OTP verified')
    setBtnTexts({ ...btnTexts, verify: BTNTEXTS.verify })
  }

  function handleSetVerify(verify) {
    setNumbers({ ...numbers, verify })
  }

  function editPhoneNumber() {
    saveToSession('editPhoneNumber', true)
    goToHref('/account/signup/phone')
  }

  async function resendSMS() {
    setBtnTexts({ ...btnTexts, resend: BTNTEXTS.resending })
    const sent = await sendSMS(numbers.phone)

    if (!sent) {
      toast.error('Something went wrong')
      setBtnTexts({ ...btnTexts, resend: BTNTEXTS.resend })
      return
    }

    toast.success('Resent SMS')
    setBtnTexts({ ...btnTexts, resend: BTNTEXTS.resend })
    setTimer(60)
  }

  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      <div className="verify_number_area">
        <form
          className="list_y"
          onSubmit={verify}
          disabled={btnTexts.verify === BTNTEXTS.verifing}
        >
          <OTPInput
            amount={6}
            setVerify={handleSetVerify}
            pastedWrongOTP={() => toast.error('Pasted wrong OTP')}
            error={wrongOTP}
            setError={setWrongOTP}
          />
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
      <div className="con_bg_dr list_y">
        <div className="d_f_jc_sb d_f_ai_ce">
          <b>{getPhoneNumber(numbers.phone)}</b>
          <Button type="button" onClick={editPhoneNumber}>
            Edit
          </Button>
        </div>
        <div className="line_x"></div>
        <p className="fz_small">
          We've sent an SMS with a confirmation code to your phone{' '}
          <b>{getPhoneNumber(numbers.phone)}</b>
        </p>
        {+timer > 0 && (
          <p className="fz_small">
            If you didn't receive an SMS, please try again after <b>{timer}s</b>
          </p>
        )}
        {+timer <= 0 && (
          <Button
            onClick={resendSMS}
            disabled={
              btnTexts.resend === BTNTEXTS.resending ||
              btnTexts.verify === BTNTEXTS.verifing
            }
          >
            {btnTexts.resend}
          </Button>
        )}
      </div>
    </>
  )
}
