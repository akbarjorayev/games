import SignupPhone from './SignupPhone/SignupPhone'
import SignupVerify from './SignupVerify/SignupVerify'
import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'

import '../Account.css'

function getSignupPage(component) {
  return (
    <>
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
          {component}
        </div>
      </div>
    </>
  )
}

export const Signup = {
  phone: getSignupPage(<SignupPhone />),
  verify: getSignupPage(<SignupVerify />),
}
