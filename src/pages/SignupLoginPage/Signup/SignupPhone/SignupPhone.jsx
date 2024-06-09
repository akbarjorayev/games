import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../../components/Button/Button'

import { sendSMS, verifyRecaptcha } from '../../../../js/db/db/SMS'
import { toastData } from '../../../../components/utils/toast'
import {
  getPhoneNumber,
  isValidUzbekMobileNumber,
} from '../../utils/phoneNumber'
import {
  loadFromSession,
  saveToSession,
} from '../../../../js/db/local/sessionStorage'
import { goToHref } from '../../../../js/utils/href'

const BTNTEXTS = {
  send: 'Next',
  sending: 'Sending',
}

export default function SignupPhone({ COMPONENTS, setComponent }) {
  const phoneNumberInput = useRef()
  const [number, setNumber] = useState('+998 ')
  const [isFillingForm, setIsFillingForm] = useState(false)
  const [btnTexts, setBtnTexts] = useState(BTNTEXTS.send)

  useEffect(() => {
    const edit = loadFromSession('editPhoneNumber')
    if (edit) {
      const number = loadFromSession('phoneNumber')
      setNumber(number)

      saveToSession('editPhoneNumber', false)
    }

    const userIsFillingForm = loadFromSession('userIsFillingForm')
    if (userIsFillingForm) {
      setIsFillingForm(true)
      saveToSession('userIsFillingForm', false)
    }
  }, [])

  async function sendOTP(e) {
    e.preventDefault()

    setBtnTexts(BTNTEXTS.sending)
    verifyRecaptcha('recaptcha-container')
    const sent = await sendSMS(number)

    if (!sent) {
      toast.error('Something went wrong')
      setBtnTexts(BTNTEXTS.send)
      return
    }

    toast.success('SMS sent')
    setBtnTexts(BTNTEXTS.send)
    saveToSession('phoneNumber', number)
    setComponent(COMPONENTS.verify)
  }

  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      <div className="phone_number_area">
        <form
          className="list_y"
          onSubmit={sendOTP}
          disabled={btnTexts === BTNTEXTS.sending}
        >
          <div className="input_area">
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              ref={phoneNumberInput}
              type="tel"
              id="phoneNumber"
              value={number}
              onChange={(e) => setNumber(getPhoneNumber(e.target.value))}
              maxLength="17"
              autoFocus
            />
          </div>
          <div className="list_x w_100_child">
            {isFillingForm && (
              <Button
                type="button"
                className="btn_bd_cl"
                onClick={() => goToHref('/account/signup/user-data')}
              >
                Back to Form
              </Button>
            )}
            <Button
              type="submit"
              className="btn_cl"
              disabled={!isValidUzbekMobileNumber(number)}
            >
              {btnTexts}
            </Button>
          </div>
        </form>
      </div>
      <div id="recaptcha-container"></div>
    </>
  )
}
