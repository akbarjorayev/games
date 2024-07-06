export function pasteImage(e) {
  return new Promise((res) => {
    const { items } = e.clipboardData

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile()
        res(blob)
      }
    }
    res(false)
  })
}
