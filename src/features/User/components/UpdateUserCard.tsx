import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { isNil } from 'lodash'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useUpdateUserMutation } from '../queries.generated'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { phoneRegExp } from '@/utils/utils'

export const UpdateUserCard: React.FC = () => {
  const schema = z.object({
    name: z.string(),
    email: z.string(),
    mobileNumber: z
      .string()
      .length(10, 'Phone number can have 10 digits only')
      .regex(phoneRegExp, 'Phone number is not valid'),
  })
  const { handleSubmit, register, resetField, setValue, formState } = useForm({
    resolver: zodResolver(schema),
  })

  const { name, email, mobileNumber } = useCurrentUser()
  const { errors } = formState
  const toast = useToast()
  const [updateUser] = useUpdateUserMutation({
    onCompleted: (data) => {
      if (!isNil(data.updateUser)) {
        toast({
          title: 'Account updated successfully',
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
      }
    },
    onError: (error) => {
      if (error) {
        toast({
          title: 'Hold on there amigo, something went wrong',
          description: 'Try again later',
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      }
    },
  })
  useEffect(() => {
    setValue('name', name)
    setValue('email', email)
    setValue('mobileNumber', mobileNumber)
  }, [email, mobileNumber, name, setValue])

  const onSubmit = async (data: any) => {
    await updateUser({
      variables: {
        input: {
          mobileNumber: data.mobileNumber,
        },
      },
    })
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
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Account
        </Heading>
        <>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="add-friend-form">
            <VStack spacing={3} mt={6} mb={6}>
              <FormControl id="name" isReadOnly>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input type="text" variant="filled" {...register('name')} />
              </FormControl>
              <FormControl id="email" isReadOnly>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input type="email" variant="filled" {...register('email')} />
              </FormControl>
              <FormControl id="mobileNumber" isInvalid={errors.mobileNumber} isRequired>
                <FormLabel htmlFor="mobileNumber">Mobile</FormLabel>
                <Input
                  placeholder="Mobile number"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  {...register('mobileNumber', {})}
                  onChange={(e) =>
                    setValue(e.target.name, e.target.value, { shouldValidate: true })
                  }
                />
                <FormErrorMessage>{errors.mobileNumber?.message}</FormErrorMessage>
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
                onClick={() => {
                  resetField('mobileNumber')
                }}
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
                disabled={!formState.isValid}
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
