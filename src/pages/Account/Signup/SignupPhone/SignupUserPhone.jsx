import { useState } from 'react'

import SignupPhone from './SignupPhone'
import SignupVerify from './SignupVerify'

const COMPONENTS = {
  phone: 'phone',
  verify: 'verify',
}

export default function SignupUserPhone() {
  const [component, setComponent] = useState(COMPONENTS.phone)

  return (
    <>
      {component === COMPONENTS.phone && (
        <SignupPhone COMPONENTS={COMPONENTS} setComponent={setComponent} />
      )}
      {component === COMPONENTS.verify && (
        <SignupVerify COMPONENTS={COMPONENTS} setComponent={setComponent} />
      )}
    </>
  )
}
