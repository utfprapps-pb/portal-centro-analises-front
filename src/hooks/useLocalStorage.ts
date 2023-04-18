export const useLocalStorage = () => {
  const LOCAL_STORAGE_KEYS = Object.freeze({
    AUTH: 'auth'
  })

  const get = (key: string) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  const set = (key: string, value: object) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const remove = (key: string) => {
    localStorage.removeItem(key)
  }

  return {
    LOCAL_STORAGE_KEYS,
    get,
    set,
    remove
  }
}
