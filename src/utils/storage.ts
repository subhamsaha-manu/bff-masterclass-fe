import { Friend } from '@/types'

const storagePrefix = 'AUTH_TOKEN'
const updateFriendProfilePrefix = 'UPDATE_FRIEND_PROFILE'

export const storage = {
  getToken: () => {
    return JSON.parse(window.sessionStorage.getItem(storagePrefix) as string)
  },
  setToken: (token: string) => {
    window.sessionStorage.setItem(storagePrefix, JSON.stringify(token))
  },
  clearToken: () => {
    window.sessionStorage.removeItem(storagePrefix)
  },
  getUpdateProfile: () => {
    return JSON.parse(window.sessionStorage.getItem(updateFriendProfilePrefix) as string)
  },
  setUpdateProfile: (updateProfile: Friend) => {
    window.sessionStorage.setItem(updateFriendProfilePrefix, JSON.stringify(updateProfile))
  },
  clearUpdateProfile: () => {
    window.sessionStorage.removeItem(updateFriendProfilePrefix)
  },
}
