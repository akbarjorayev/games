import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../db/local/localStorage'

export function checkRunApp() {
  checkInitialLocalStorage()
  checkAds()
}

export function checkInitialLocalStorage() {
  if (!loadFromLocalStorage('games')) {
    saveToLocalStorage('games', getInitialLocalStorage())
  }
}

export function getInitialLocalStorage() {
  const data = {
    accounts: {
      active: '',
      ids: [],
    },
  }

  return data
}

function checkAds() {
  const script = document.createElement('script')
  script.async = true
  script.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7347223343628043'
  script.crossOrigin = 'anonymous'

  document.head.appendChild(script)
}
