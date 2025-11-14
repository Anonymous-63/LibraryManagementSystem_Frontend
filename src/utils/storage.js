export const storage = {
  set(key, value, useSession = false) {
    const s = useSession ? sessionStorage : localStorage
    s.setItem(key, value)
  },
  get(key) {
    const v = localStorage.getItem(key) || sessionStorage.getItem(key)
    try { return JSON.parse(v) } catch { return null }
  },
  remove(key) {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  }
}
