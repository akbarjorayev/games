import React from 'react'

import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'

export default function AccountPageNonAuth() {
  return (
    <>
      <div className="pos_full_page d_f_ce">
        <div className="con mar_ce blur_theme_bg w_max list_y">
          <div>You are not logged in yet</div>
          <Button onClick={() => goToHref('/account/login')}>Log in</Button>
        </div>
      </div>
    </>
  )
}
