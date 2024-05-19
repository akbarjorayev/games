import SignupPhone from './SignupPhone/SignupPhone'
import SignupVerify from './SignupVerify/SignupVerify'
import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'

import '../Account.css'

const PAGES = {
  phone: 'phone',
  verify: 'verify',
}

function getSignupPage(component, pageName) {
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
          <div className="list_x" style={{ '--line-anim-duration': '1s' }}>
            {pageName === PAGES.phone && (
              <>
                <div className="line_x line_color"></div>
                <div className="line_x line_dark"></div>
                <div className="line_x line_dark"></div>
              </>
            )}
            {pageName === PAGES.verify && (
              <>
                <div className="line_x line_color"></div>
                <div className="line_x line_color"></div>
                <div className="line_x line_dark"></div>
              </>
            )}
          </div>
          {component}
        </div>
      </div>
    </>
  )
}

export const Signup = {
  phone: getSignupPage(<SignupPhone />, PAGES.phone),
  verify: getSignupPage(<SignupVerify />, PAGES.verify),
}
