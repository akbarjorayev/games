import { useRef } from 'react'

import './OTPInput.css'
import './Input.css'

export default function OTPInput({
  amount,
  setVerify,
  pastedWrongOTP,
  error,
  setError,
}) {
  const inputs = Array(amount).fill(0)
  const inputRefs = useRef([])

  function handleKeyDown(e, i) {
    if (e.key === 'Backspace' && i > 0) {
      setTimeout(() => inputRefs.current[i - 1].focus())
      changeVerify()
    }
  }

  function handleChange(e, i) {
    const value = e.target.value
    if (value.length === 1 && i < amount - 1) inputRefs.current[i + 1].focus()
    changeVerify()
  }

  function paste(e) {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')

    if (/^\d{6}$/.test(pastedText)) {
      inputRefs.current.map((inputRef, i) => {
        inputRef.value = pastedText[i]
        e.target.blur()
      })
      changeVerify()
      return
    }

    if (pastedWrongOTP) pastedWrongOTP()
  }

  function changeVerify() {
    const verify = inputRefs.current.map((inputRef) => inputRef.value).join('')
    setVerify(verify)
    setError(false)
  }

  return (
    <>
      <div className="OTP_input">
        {inputs.map((_, i) => (
          <input
            type="tel"
            key={i}
            maxLength={1}
            className={`${error ? 'error' : ''}`}
            ref={(el) => (inputRefs.current[i] = el)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onChange={(e) => handleChange(e, i)}
            onPaste={paste}
          />
        ))}
      </div>
    </>
  )
}
