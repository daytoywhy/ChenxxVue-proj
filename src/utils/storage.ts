/**自定义储存工具 */

const useStorage = ($storage: any) => {
  /**
   * 从storage中取值，在存、取的时候要将value通过json方法处理，这样才不会影响boolean类型的判断
   * @param key 
   * @returns 
   */
  const get = (key: string) => {
    let value = $storage.getItem(key)
    try {
      value = JSON.parse(value)
      return value
    } catch {
      return value
    }
  }

  /**
   * 从storage中取值，value需要通过json方法处理
   * @param key 
   * @param value 
   * @returns 
   */
  const set = (key: string, value: any) => {
    return $storage.setItem(key, value ? JSON.stringify(value) : value)
  }

  /**
   * 清除storage中的某个值
   * @param key 
   * @returns 
   */
  const remove = (key: string) => {
    return $storage.removeItem(key)
  }

  /**
   * 除了传入的值，将其他值都清除
   * @param key 
   */
  const clearExcept = (key: string) => {
    for (let i = 0; i < $storage.length; i++) {
      const itemKey: string | undefined = $storage.key(i)
      if (itemKey && itemKey !== key) {
        $storage.removeItem(itemKey)
      }
    }
  }

  /**
   * 清除所有
   */
  const clearAll = () => {
    for (const itemKey in $storage) {
      if (itemKey) {
        $storage.removeItem(itemKey)
      }
    }
  }

  return {
    get,
    set,
    remove,
    clearExcept,
    clearAll
  }
}

const handlerSessionStorage = useStorage(window.sessionStorage || sessionStorage)
const handlerLocalStorage = useStorage(window.localStorage || localStorage)

export {
  handlerSessionStorage,
  handlerLocalStorage
}