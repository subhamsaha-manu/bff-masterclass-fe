export const logoutFn = async () => {
  window.location.assign(window.location.origin as unknown as string)
}
