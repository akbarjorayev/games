import { useState } from 'react'

import './Input.css'

export default function Input({
  type = 'text',
  label: inputLabel,
  value: iValue,
  ...props
}) {
  const [value, setValue] = useState(iValue === undefined ? '' : iValue)

  function changeInput(e) {
    setValue(e.target.value)
    if (props.onChange) props.onChange(e)
  }

  return (
    <>
      <div className="input_area">
        <label htmlFor={inputLabel}>{inputLabel}</label>
        <input
          value={value}
          id={inputLabel}
          type={type}
          onChange={changeInput}
          {...props}
        />
      </div>
    </>
  )
}
