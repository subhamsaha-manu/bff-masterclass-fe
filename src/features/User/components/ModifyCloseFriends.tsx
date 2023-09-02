import { Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

// eslint-disable-next-line no-restricted-imports
import { ProfileCard } from '@/features/profiles/components/ProfileCard'
import { Friend } from '@/types'

type ModifyCloseFriendsProps = {
  profiles: Array<Friend>
  closeFriends: Array<Friend>
}
export const ModifyCloseFriends: React.FC<ModifyCloseFriendsProps> = ({
  profiles,
  closeFriends,
}) => {
  return (
    <Stack minH={'100vh'} minW="100%" direction={{ base: 'column', md: 'row' }}>
      <VStack display-name="friends-vstack-div-container" spacing={4} p={2} minW="50%">
        <Heading as="h2" size="lg">
          Friends
        </Heading>
        <Droppable droppableId="friends-container">
          {(provided) => (
            <VStack
              display-name="friends-vstack-div"
              spacing={4}
              border={'1px solid white'}
              p={4}
              {...provided.droppableProps}
              ref={provided.innerRef}
              width="100%"
              height="100%"
            >
              {profiles.map((profile, index) => (
                <Draggable draggableId={profile.uuid!} index={index} key={profile.uuid!}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ProfileCard key={`profile-card-${profile?.uuid}`} friend={profile} />
                    </div>
                  )}
                </Draggable>
              ))}
            </VStack>
          )}
        </Droppable>
      </VStack>
      <VStack display-name="close-friends-vstack-div-container" spacing={4} p={2} minW="50%">
        <Heading as="h2" size="lg">
          Close Friends
        </Heading>
        <Droppable droppableId={'close-friends-container'}>
          {(provided) => (
            <VStack
              display-name="close-friends-vstack-div"
              spacing={4}
              border={'1px solid white'}
              p={4}
              {...provided.droppableProps}
              ref={provided.innerRef}
              width="100%"
              height="100%"
            >
              {closeFriends.map((closeFriend, index) => (
                <Draggable draggableId={closeFriend.uuid!} index={index} key={closeFriend.uuid!}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ProfileCard key={`profile-card-${closeFriend?.uuid}`} friend={closeFriend} />
                    </div>
                  )}
                </Draggable>
              ))}
            </VStack>
          )}
        </Droppable>
      </VStack>
    </Stack>
  )
}
