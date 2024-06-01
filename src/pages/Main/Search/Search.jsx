import Input from '../../../components/Input/Input'

import './Search.css'

export default function Search() {
  return (
    <>
      <div className="h_100 d_f_jc_ce">
        <div className="con search_con blur_theme_bg list_y">
          <Input placeholder="Search" autoFocus />
        </div>
      </div>
    </>
  )
}
