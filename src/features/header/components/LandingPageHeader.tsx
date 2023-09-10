import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthModal } from '@/features/auth'

export const LandingPageHeader = () => {
  const { isOpen, onToggle } = useDisclosure()
  const navigate = useNavigate()

  const handleSignUpClick = () => {
    navigate('/auth/register')
  }

  const {
    isOpen: isAuthModalOpen,
    onOpen: onAuthModalOpen,
    onClose: onAuthModalClose,
  } = useDisclosure()

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'start' }}
          alignItems={{ base: 'center', md: 'center' }}
          cursor="pointer"
          onClick={() => navigate('/')}
        >
          {/*<DesktopNav />*/}
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <Button fontSize={'md'} fontWeight={400} variant={'link'} onClick={onAuthModalOpen}>
            Sign In
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav handleSignUpClick={handleSignUpClick} />
      </Collapse>
      <AuthModal isOpen={isAuthModalOpen} onClose={onAuthModalClose} />
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'md'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('teal.100', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'teal.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}
type MobileNavProps = {
  handleSignUpClick: () => void
}
const MobileNav: React.FC<MobileNavProps> = ({ handleSignUpClick }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Divider />

      <Flex justify={'center'}>
        <Button
          fontSize={'md'}
          fontWeight={600}
          color={'black'}
          border={'1px solid black'}
          onClick={() => handleSignUpClick()}
          _hover={{
            bg: 'teal.300',
          }}
        >
          Sign Up
        </Button>
      </Flex>
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Contact Us',
    children: [
      {
        label: 'Get in touch',
        subLabel: 'Fill the form! I will get back to you.',
        href: '/contact-us',
      },
      {
        label: 'Contribute to the project',
        subLabel: 'See a bug? Want to contribute?',
        href: '/contribute',
      },
    ],
  },
  {
    label: 'FAQs',
    href: '/faq',
  },
]
