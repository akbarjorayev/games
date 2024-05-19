import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../../components/Button/Button'
import OTPInput from '../../../../components/Input/OTPInput'

import { verifySMS } from '../../../../js/db/db/SMS'
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
}

export default function SignupVerify() {
  const [wrongOTP, setWrongOTP] = useState(false)
  const [numbers, setNumbers] = useState({
    phone: loadFromSession('phoneNumber') || '+998 ',
    verify: '',
  })
  const [btnTexts, setBtnTexts] = useState(BTNTEXTS.verify)

  async function verify(e) {
    e.preventDefault()

    setBtnTexts(BTNTEXTS.verifing)
    const verified = await verifySMS(numbers.phone, numbers.verify)

    if (!verified) {
      toast.error('Wrong OTP')
      setWrongOTP(true)
      setNumbers({ ...numbers, verify: '' })
      setBtnTexts(BTNTEXTS.verify)
      return
    }

    toast.success('OTP verified')
    setBtnTexts(BTNTEXTS.verify)
  }

  function handleSetVerify(verify) {
    setNumbers({ ...numbers, verify })
  }

  function editPhoneNumber() {
    saveToSession('editPhoneNumber', true)
    goToHref('/account/signup/phone')
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
          disabled={btnTexts === BTNTEXTS.verifing}
        >
          <div className="con_bg_dr d_f_jc_sb d_f_ai_ce">
            <div>{getPhoneNumber(numbers.phone)}</div>
            <Button type="button" onClick={editPhoneNumber}>
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
            {btnTexts}
          </Button>
        </form>
      </div>
    </>
  )
}
