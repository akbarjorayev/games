import SearchWillbeFixed from './SearchWillbeFixed'

import { SEARCH_PAGE_STATUS } from '../SearchPageStatus'

export default function SearchStatus({ status }) {
  return (
    <>
      <div className="h_100 d_f_ce pos_r list_y search_status">
        <span className="material-symbols-outlined fz_big_icon">search</span>
        {status === SEARCH_PAGE_STATUS.home && (
          <>
            <div>Search for friends</div>
            <SearchWillbeFixed />
          </>
        )}
        {status === SEARCH_PAGE_STATUS.searching && (
          <div>Searching for friends</div>
        )}
      </div>
    </>
  )
}
