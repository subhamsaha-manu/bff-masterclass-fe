export const onDragEnd = ({ result, profiles, setProfiles, closeFriends, setCloseFriends }) => {
  const { source, destination } = result
  if (!destination) {
    return
  }
  move(profiles, closeFriends, source, destination, setProfiles, setCloseFriends)
}

const move = (profiles, closeFriends, source, destination, setProfiles, setCloseFriends) => {
  const sourceClone = Array.from(profiles)
  const destClone = Array.from(closeFriends)
  const [removed] = sourceClone.splice(source.index, 1)
  console.log('removed', removed)
  console.log('source', sourceClone)
  destClone.splice(destination.index, 0, removed)

  setProfiles(sourceClone)
  setCloseFriends(destClone)
}
