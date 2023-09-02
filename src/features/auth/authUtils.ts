import { storage } from '@/utils/storage'

export const logoutFn = async () => {
  storage.clearToken()
  window.location.assign(window.location.origin as unknown as string)
}
