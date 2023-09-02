import shuffle from 'lodash/shuffle'

export const getAvatars = () => {
  const result = []
  for (let i = 1; i <= 10; i++) {
    const avatarKey = `avatar_${i}`
    result.push({
      key: avatarKey,
      img: require(`@/assets/images/avatars/${avatarKey}.png`),
      default: false,
    })
  }
  return [...shuffle(result)]
}

export const getAvatarUrlByCode = (code: string) => {
  const defaultAvatar = {
    key: `avatar_00`,
    img: require(`@/assets/images/avatars/avatar_00.png`),
    default: true,
  }
  const avatars = [defaultAvatar, ...getAvatars()]
  const avatarData =
    avatars.find((option) => option.key === (code || 'avatar_00')) ||
    avatars.find((avatar) => avatar.default)
  return avatarData?.img.default
}
