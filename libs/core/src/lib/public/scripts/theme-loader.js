;(function () {
  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
  }

  const currentScript = document.currentScript
  const cookieName = currentScript.getAttribute('data-cookie-name') || 'default-theme-mode'
  const themeMode = getCookie(cookieName)
  let isDark = false

  if (themeMode === 'dark') {
    isDark = true
  } else if (themeMode === 'light') {
    isDark = false
  } else {
    isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  if (isDark) {
    document.documentElement.classList.add('dark')
  }
})()
