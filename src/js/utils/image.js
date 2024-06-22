export async function imageCompressor(
  image,
  maxWidth = 800,
  quality = 0.7,
  format = 'image/jpeg'
) {
  return new Promise((res, rej) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, width, height)

        const dataUrl = canvas.toDataURL(format, quality)
        res(dataUrl)
      }
      img.src = event.target.result
    }

    reader.onerror = (err) => {
      rej(err)
    }

    reader.readAsDataURL(image)
  })
}
