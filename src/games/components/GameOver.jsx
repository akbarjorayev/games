import Button from '../../components/Button/Button'

import { goToHref } from '../../js/utils/href'
import { deleteFromSession } from '../../js/db/local/sessionStorage'

export default function GameOver() {
  function goToHome() {
    deleteFromSession('gameToken')
    deleteFromSession('gameLink')

    goToHref('/')
  }

  return (
    <div className="h_100 d_f_ce">
      <div className="list_y">
        <div className="fz_big">
          <span className="txt_red">Game is over</span> go to
        </div>
        <Button className="btn_bd txt_cl w_100" onClick={goToHome}>
          Home page
        </Button>
      </div>
    </div>
  )
}
