import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { noop } from 'lodash'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as z from 'zod'

import { useLoginLazyQuery } from '../apis/login.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { GraphQLErrorMessage } from '@/features/common/GraphQLErrorMessage'
import CurrentUserContext from '@/hooks/useCurrentUser'
import { User } from '@/types'
import { IS_AUTHENTICATED, USER_TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

const schema = z.object({
  email: z.string().email().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
})

export type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const { setUser } = useContext(CurrentUserContext)

  const [loginUser, { error }] = useLoginLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const { token } = data.login
      if (!token) {
        toast({
          title: "Seems like we don't have you in our database",
          description: 'Kindly signup',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return null
      }
      storage.setItem(USER_TOKEN, data.login.token)
      storage.setItem(IS_AUTHENTICATED, true)
      toast({
        title: 'Login successful.',
        description: 'Welcome back.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      setUser({ user: {} as User, setUser: noop })

      onSuccess()
    },
  })
  const onSubmit = (values: any) => {
    const { email, password } = values
    loginUser({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
  }

  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const toast = useToast()

  if (isSubmitting) {
    return <SpinnerContainer />
  }
  if (error) {
    return <GraphQLErrorMessage error={error} testId="LoginForm" />
  }
  return (
    <>
      {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
      <Flex display-name="login-form-container" flexDir="column" gap={4} w="100%">
        <Stack spacing={4}>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
            <VStack spacing={8} align="stretch">
              <FormControl isInvalid={false} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  {...register('email', {
                    required: 'This is required',
                  })}
                />
                <FormErrorMessage data-testid="login-email-error-message">
                  {errors.email && errors.email.message}
                </FormErrorMessage>
                <FormHelperText>We never share your email.</FormHelperText>
              </FormControl>
              <FormControl isInvalid={false} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    data-testid="password-input"
                    {...register('password', {
                      required: 'This is required',
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <HStack align="center" justifyContent="space-between">
                <Link to="/auth/register">
                  <Text color={'blue.400'}>Create Account</Text>
                </Link>
                <Button mt={4} colorScheme="teal" variant="outline" type="submit">
                  Submit
                </Button>
              </HStack>
            </VStack>
          </form>
        </Stack>
      </Flex>
    </>
  )
}
