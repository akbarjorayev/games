import { GAMES } from '../../data/gameData'

import './GameList.css'

export default function GameList() {
  return (
    <>
      <div className="d_f_gap d_f_jc_ce" style={{ '--d-f-gap': '10px' }}>
        {GAMES.map((game, i) => getGameCon(game, i))}
      </div>
    </>
  )
}

function getGameCon(game, i) {
  return (
    <a
      rel="noreferrer"
      href={game.link}
      target="_self"
      className="game d_f_fd_c blur_theme_bg blur_ha"
      key={i}
    >
      <div className="game_icon d_f_1">
        <div className="img d_f_ce">
          <img src={game.icon} alt={game.name} />
        </div>
      </div>
      <b className="con_bg_none blur_theme_bg bd_none d_f_ce game_name fz_medium">
        {game.name}
      </b>
    </a>
  )
}
