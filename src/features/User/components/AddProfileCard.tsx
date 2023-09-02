import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { useAddModifyFriendMutation } from '../queries.generated'

import { ChooseAvatarModal } from '@/features/AvatarModal'
import { getAvatars, getAvatarUrlByCode } from '@/utils/getAvatars'
import { storage } from '@/utils/storage'
import { StatusCode } from '@/utils/utils'

export const AddProfileCard: React.FC = () => {
  const schema = z.object({
    name: z.string().min(1, 'Required'),
    email: z.string(),
    mobileNumber: z.string(),
    birthday: z.string(),
  })
  const { handleSubmit, register, reset, setValue, formState } = useForm({
    resolver: zodResolver(schema),
  })

  const { errors } = formState
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const toast = useToast()
  const [avatarImageKey, setAvatarImageKey] = useState<string>('')
  const [updateProfileUUID, setUpdateProfileUUID] = useState<string>('')

  useEffect(() => {
    const updateProfile = storage.getUpdateProfile()
    if (updateProfile) {
      const { uuid, name, email, mobileNumber, birthday, avatar } = updateProfile
      setValue('name', name)
      setValue('email', email)
      setValue('mobileNumber', mobileNumber)
      setValue('birthday', birthday)
      setAvatarImageKey(avatar)
      setUpdateProfileUUID(uuid)
      storage.clearUpdateProfile()
    }
  }, [setValue])
  const [addProfile] = useAddModifyFriendMutation({
    onCompleted: (data) => {
      if (data.addModifyFriend.code === StatusCode.OK) {
        toast({
          title: 'Friend added/updated successfully',
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
      }
    },
  })
  const avatars = getAvatars()
  const onSubmit = (data: any) => {
    data = {
      ...data,
      avatar: avatarImageKey,
      uuid: updateProfileUUID,
    }
    addProfile({
      variables: {
        input: data,
      },
    })
    onCancelClick()
  }

  const onCancelClick = () => {
    reset()
    setAvatarImageKey('')
  }

  return (
    <Flex w="95%" align={'center'} justify={'center'} display-name="AddProfileCard Container">
      <Stack
        spacing={4}
        w={'full'}
        maxW={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Flex display-name="close-icon-flex" justifyContent="flex-end">
          <CloseIcon w={3} h={3} color="black" onClick={() => navigate('/app')} cursor="pointer" />
        </Flex>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Add Friend
        </Heading>
        <>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="add-friend-form">
            <Stack direction={['column', 'row']} spacing={6}>
              <Image
                borderRadius="full"
                boxSize={{ base: '100px', lg: '150px' }}
                src={getAvatarUrlByCode(avatarImageKey)}
              />
              <Center w="full">
                <Button onClick={onOpen} w="full">
                  Choose Avatar
                </Button>
              </Center>
              <ChooseAvatarModal
                isOpen={isOpen}
                onClose={onClose}
                onAvatarClick={setAvatarImageKey}
                avatars={avatars}
                avatarId={avatarImageKey}
              />
            </Stack>
            <VStack spacing={3} mt={6} mb={6}>
              <FormControl id="name" isInvalid={errors.name} isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  placeholder="Name"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  {...register('name')}
                />
                <FormErrorMessage data-testid="add-friend-name-error-message">
                  {errors.name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="email">
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  placeholder="email@example.com"
                  _placeholder={{ color: 'gray.500' }}
                  type="email"
                  {...register('email')}
                />
              </FormControl>
              <FormControl id="mobileNumber">
                <FormLabel htmlFor="mobileNumber">Mobile</FormLabel>
                <Input
                  placeholder="Mobile number"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  {...register('mobileNumber')}
                />
              </FormControl>
              <FormControl id="birthday" isInvalid={errors.birthday} isRequired>
                <FormLabel htmlFor="birthday">Birthday</FormLabel>
                <Input
                  placeholder="Birthday"
                  _placeholder={{ color: 'gray.500' }}
                  type="date"
                  {...register('birthday')}
                />
                <FormErrorMessage data-testid="add-friend-birthday-error-message">
                  {errors.birthday?.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>

            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}
                onClick={onCancelClick}
              >
                Cancel
              </Button>
              <Button
                color={'white'}
                w="full"
                _hover={{
                  bg: 'cyan.400',
                }}
                colorScheme="teal"
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </>
      </Stack>
    </Flex>
  )
}
