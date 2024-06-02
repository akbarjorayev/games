import { useEffect, useState } from 'react'

import Input from '../../../components/Input/Input'
import SearchStatus from './components/SearchStatus'

import { useDebounce } from '../../../hooks/useDebounce'
import { SEARCH_PAGE_STATUS } from './SearchPageStatus'

import './Search.css'
import SearchResults from './components/SearchResults'

export default function Search() {
  const [search, setSearch] = useState('')
  const [searchStatus, setSearchStatus] = useState(SEARCH_PAGE_STATUS.home)
  const [debouncedSearch] = useDebounce(search, 500)

  useEffect(() => {
    if (!debouncedSearch) return setSearchStatus(SEARCH_PAGE_STATUS.home)

    setSearchStatus(SEARCH_PAGE_STATUS.hasResults)
  }, [debouncedSearch])

  useEffect(() => {
    if (search) setSearchStatus(SEARCH_PAGE_STATUS.searching)
  }, [search])

  return (
    <>
      <div className="h_100 d_f_jc_ce">
        <div className="con search_con blur_theme_bg list_y">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            autoFocus
          />
          {searchStatus !== SEARCH_PAGE_STATUS.hasResults && (
            <SearchStatus status={searchStatus} />
          )}
          {searchStatus === SEARCH_PAGE_STATUS.hasResults && (
            <SearchResults value={search} />
          )}
        </div>
      </div>
    </>
  )
}
