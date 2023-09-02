import { useLazyQuery } from '@apollo/client'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
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
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { noop } from 'lodash'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as z from 'zod'

import { LOGIN_USER } from './queries'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { authContext, GraphQLErrorMessage } from '@/features/auth'
import CurrentUserContext from '@/hooks/useCurrentUser'
import { User } from '@/types'
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
  const { setAuthenticated } = useContext(authContext)
  const [loginUser, { error }] = useLazyQuery(LOGIN_USER, {
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
      storage.setToken(data.login.token)
      toast({
        title: 'Login successful.',
        description: 'Welcome back.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      setUser({ user: {} as User, setUser: noop })
      setAuthenticated(true)
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
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <Stack spacing={4}>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
            <VStack spacing={8} align="stretch">
              <FormControl isInvalid={errors.email} isRequired>
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
              <FormControl isInvalid={errors.password} isRequired>
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
      </Box>
    </>
  )
}
