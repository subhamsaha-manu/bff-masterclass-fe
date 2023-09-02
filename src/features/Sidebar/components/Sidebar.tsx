import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ReactNode, ReactText } from 'react'
import { IconType } from 'react-icons'
import { FaBirthdayCake, FaUsers, MdOutlineContactPhone } from 'react-icons/all'
import { FiHome, FiMenu } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { AppHeader } from '@/features/Header'

interface LinkItemProps {
  name: string
  to?: string
  icon: IconType
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', to: '/app', icon: FiHome },
  { name: 'Add Friend', to: '/app/add-friend', icon: FaUsers },
  { name: 'Get In Touch', to: '/app/contact-us', icon: MdOutlineContactPhone },
  // { name: 'Close Friends', to: '/app/close-friends', icon: FaUsersCog },
]
type SidebarProps = {
  children?: ReactNode
}
export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      minH="90vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
      display-name="sidebar-box-component"
    >
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  )
}

interface SidebarContentProps extends BoxProps {
  onClose: () => void
}

const Logo = () => {
  const navigate = useNavigate()
  return (
    <Box
      display="flex"
      color="white"
      gap="8"
      display-name="Logo container"
      cursor="pointer"
      onClick={() => navigate('/app')}
    >
      <FaBirthdayCake fontSize="40px" />
      <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
        Birthday Reminder
      </Text>
    </Box>
  )
}
const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  return (
    <Box
      bg={useColorModeValue('#1f2937', 'gray.900')}
      display-name="Sidebar content box component"
      color={useColorModeValue('white', 'gray.100')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  to?: string
  children: ReactText
}

const NavItem = ({ icon, to, children, ...rest }: NavItemProps) => {
  return (
    <Link href={to} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
      <Flex justify="center" display-name="header-flex-container-2" zIndex="dropdown">
        <AppHeader />
      </Flex>
    </Flex>
  )
}
