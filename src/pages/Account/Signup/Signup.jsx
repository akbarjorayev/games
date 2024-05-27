import SignupUserPhone from './SignupPhone/SignupUserPhone'
import SignupUserData from './SignupUserData/SignupUserData'
import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'

import '../Account.css'

const PAGES = {
  phone: 'phone',
  userData: 'userData',
}

function GetSignupPage(component, pageName) {
  const hasAccount = loadFromLocalStorage('games').accounts.active

  return (
    <>
      <div className="h_100 d_f_ce">
        <div className="account_con list_y">
          <div className="con_bg_df list_y">
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
                </>
              )}
              {pageName === PAGES.userData && (
                <>
                  <div className="line_x line_color"></div>
                  <div className="line_x line_color"></div>
                </>
              )}
            </div>
            {component}
          </div>
          {hasAccount && (
            <Button className="btn_cl" onClick={() => goToHref('/')}>
              Home page
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export const Signup = {
  phone: GetSignupPage(<SignupUserPhone />, PAGES.phone),
  userData: GetSignupPage(<SignupUserData />, PAGES.userData),
}
