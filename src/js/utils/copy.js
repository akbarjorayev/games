export function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
    return { ok: true, msg: 'Text copied to clipboard' }
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)

    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      return { ok: true, msg: 'Text copied to clipboard' }
    } catch (err) {
      return { ok: false, msg: 'Failed to copy text to clipboard' }
    } finally {
      document.body.removeChild(textArea)
    }
  }
}
