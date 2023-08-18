export const preventContextMenu = () => {
  const availableTags = ['a', 'img', 'input']

  const handleContextMenu = ev => {
    if (availableTags.includes(ev.target.tagName.toLowerCase())) return
    ev.preventDefault()
  }

  self.document.addEventListener('contextmenu', handleContextMenu, { passive: false })
}
