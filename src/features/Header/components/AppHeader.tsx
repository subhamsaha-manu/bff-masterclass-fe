import { Avatar, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { IoMdLogOut, VscAccount } from 'react-icons/all'
import { useNavigate } from 'react-router'

import { logoutFn } from '@/features/auth'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const AppHeader = () => {
  const { name } = useCurrentUser()
  const navigate = useNavigate()
  //const { logout } = useAuth0()
  return (
    <>
      <Menu>
        <MenuButton as={IconButton} isRound _focus={{ boxShadow: 'none' }}>
          <Avatar size="md" name={name} bg="cyan.400" />
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<VscAccount fontSize="20px" />}
            onClick={() => navigate('/app/my-account')}
          >
            My Account
          </MenuItem>
          <MenuItem icon={<IoMdLogOut fontSize="20px" />} onClick={() => logoutFn()}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
