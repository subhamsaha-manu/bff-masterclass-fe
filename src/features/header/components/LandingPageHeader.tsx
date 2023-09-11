import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Icon,
  IconButton,
  Link,
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
        />

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
