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

import { useSignupMutation } from './queries.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { authContext, GraphQLErrorMessage } from '@/features/auth'
import CurrentUserContext from '@/hooks/useCurrentUser'
import { User } from '@/types'
import { storage } from '@/utils/storage'

type RegisterFormProps = {
  onSuccess: () => void
}

const schema = z.object({
  name: z.string().nonempty().max(50),
  email: z.string().email().min(1, 'Required'),
  mobileNumber: z.string(),
  password: z.string().min(1, 'Required'),
})
export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const { setUser } = useContext(CurrentUserContext)
  const { setAuthenticated } = useContext(authContext)
  const toast = useToast()
  const [signup, { loading, error }] = useSignupMutation({
    onCompleted: (data) => {
      storage.setToken(data.signup.token)
      toast({
        title: 'Signup Successful',
        description: 'Welcome.',
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
    const { email, password, name, mobileNumber } = values
    signup({
      variables: {
        input: {
          email,
          password,
          name,
          mobileNumber,
        },
      },
    })
  }

  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  if (loading) {
    return <SpinnerContainer />
  }
  if (error) {
    return <GraphQLErrorMessage error={error} testId="RegisterForm" />
  }
  return (
    <>
      {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <Stack spacing={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={8} align="stretch">
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Name"
                  type="text"
                  {...register('name', {
                    required: 'This is required',
                  })}
                />
                <FormHelperText>Any name you want us to remember you by</FormHelperText>
              </FormControl>
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
              <FormControl>
                <FormLabel htmlFor="mobileNumber">Mobile</FormLabel>
                <Input
                  id="mobileNumber"
                  placeholder="Mobile Number"
                  type="text"
                  {...register('mobileNumber', {})}
                />
                <FormHelperText>Provide number to get sms alert</FormHelperText>
              </FormControl>
              <FormControl isInvalid={errors.password} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
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
                <Link to="/auth/login">
                  <Text color={'blue.400'}>Login to existing Account</Text>
                </Link>
                <Button
                  mt={4}
                  colorScheme="teal"
                  variant="outline"
                  isLoading={isSubmitting && loading}
                  type="submit"
                  role="button"
                >
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
