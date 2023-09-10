import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { IoMdLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { IS_AUTHENTICATED, USER_TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

const Links = [{ name: 'Home', path: '/home' }]

const NavLink = ({ name, path }: { name: string; path: string }) => (
  <Link
    px={2}
    py={1}
    rounded="md"
    _activeStep={{ color: '#5754a8' }}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={`/#/app${path}`}
  >
    {name}
  </Link>
)

export const AppHeader: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { name } = useCurrentUser()

  const navigate = useNavigate()

  const logoutUser = () => {
    storage.clearItem(IS_AUTHENTICATED)
    storage.clearItem(USER_TOKEN)
    navigate('/')
  }

  return (
    <>
      <Box
        style={{
          background: 'rgba(255, 253, 253, 0.6)',
        }}
        display-name="app-header-flex-container"
        px={4}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <Flex
          h={16}
          alignItems="center"
          gap={2}
          justifyContent="space-between"
          padding={{ base: '0', xl: '0 170px' }}
          display-name="app-header-home-and-avatar-container"
        >
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center" w="86%" display-name="nav-hstack-container">
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map(({ name, path }) => (
                <NavLink key={path} name={name} path={path} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems="center" display-name="avatar-flex-container">
            <Menu>
              <MenuButton as={IconButton} isRound _focus={{ boxShadow: 'none' }}>
                <Avatar size="md" name={name} bg="cyan.400" />
              </MenuButton>
              <MenuList zIndex="10">
                <MenuItem icon={<IoMdLogOut fontSize="20px" />} onClick={logoutUser}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {Links.map(({ name, path }) => (
                <NavLink key={path} name={name} path={path} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
