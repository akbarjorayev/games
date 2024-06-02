import { SEARCH_PAGE_STATUS } from '../SearchPageStatus'

export default function SearchStatus({ status }) {
  return (
    <>
      <div className="h_100 d_f_ce list_y">
        <span className="material-symbols-outlined fz_big_icon">search</span>
        {status === SEARCH_PAGE_STATUS.home && <div>Search for friends</div>}
        {status === SEARCH_PAGE_STATUS.searching && (
          <div>Searching for friends</div>
        )}
      </div>
    </>
  )
}
