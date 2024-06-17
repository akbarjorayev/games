import Loading from '../../../components/Loading/Loading'

import { useFirebaseStore } from '../../../hooks/useFirebaseStore'

export default function GamePageCon({ game, setFriendsAlert }) {
  const [logo] = useFirebaseStore(`dev${game.link}.jpg`)

  function gettingStart() {
    setFriendsAlert((prev) => ({ ...prev, show: true, link: game.link }))
  }

  return (
    <div
      className="game d_f_fd_c blur_theme_bg blur_ha scale_trns"
      tabIndex="0"
      onClick={gettingStart}
      onKeyDown={(e) => {
        if (e.key === 'Enter') gettingStart()
      }}
    >
      <div className="game_icon d_f_1">
        {!logo && <Loading size={100} />}
        {logo && (
          <div className="img d_f_ce">
            <img src={logo} alt={game.name} />
          </div>
        )}
      </div>
      <b className="con blur_theme_bg bd_none d_f_ce game_name fz_medium">
        {game.name}
      </b>
    </div>
  )
}
