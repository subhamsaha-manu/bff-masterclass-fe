import { EditIcon } from '@chakra-ui/icons'
import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Friend } from '@/types'
import { getAvatarUrlByCode } from '@/utils/getAvatars'
import { storage } from '@/utils/storage'

type ProfileCardProps = {
  friend: Friend
  isEditable?: boolean
}
export const ProfileCard: React.FC<ProfileCardProps> = ({ friend, isEditable = false }) => {
  const navigate = useNavigate()
  const transformDate = (birthday: string) => {
    return moment(new Date(birthday)).format('MMMM DD')
  }

  const editProfile = (friend: Friend) => {
    storage.setUpdateProfile(friend)
    navigate('/app/add-friend')
  }
  const { name, birthday, avatar, uuid } = friend
  return (
    <HStack
      display-name="profile-card-hstack-div"
      spacing={4}
      key={`profile-card-hstack-div-${uuid}`}
      border={'1px solid white'}
      p={4}
    >
      <Box
        display-name="profile-card-avatar-div"
        w={{ base: '30%', md: '50%' }}
        key={`profile-card-avatar-div-${uuid}`}
      >
        <Image
          borderRadius="full"
          boxSize={{ base: '80px', lg: '100px' }}
          src={getAvatarUrlByCode(avatar)}
          key={`avatar-image-${uuid}`}
        />
      </Box>
      <VStack
        spacing={1}
        display-name="profile-card-vstack-div"
        w="100%"
        alignItems="normal"
        key={`profile-card-vstack-div-${uuid}`}
      >
        <Text fontSize={{ base: 'xl', lg: '2xl' }} key={`name-text-${uuid}`}>
          {name}
        </Text>
        <Text fontSize={{ base: 'md', lg: 'xl' }} key={`birthday-text-${uuid}`}>
          {transformDate(birthday)}
        </Text>
      </VStack>
      {isEditable && (
        <EditIcon w={5} h={5} color="white" onClick={() => editProfile(friend)} cursor="pointer" />
      )}
    </HStack>
  )
}
