import {
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { TiTimes } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from './LoginForm'

import illustration from '@/assets/illustrations/auth-modal-illustration.svg'

type AuthCommonProps = {
  isOpen: boolean
  onClose: () => void
}

export const AuthModal: FC<AuthCommonProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const onAuthSuccess = () => {
    navigate('/app')
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom" size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0} minW="800px" minH="560px" borderRadius={2} background="white">
            <Flex direction="row" display-name="modal-content" h="560px">
              <Flex
                h="100%"
                w="384px"
                display-name="left-side"
                p="32px 16px"
                background="rgb(217, 232, 253)"
                direction="column"
                justify="start"
              >
                <Flex display-name="close-button">
                  <IconButton
                    variant="ghost"
                    aria-label="Close Modal"
                    icon={<TiTimes fontSize={20} />}
                    onClick={onClose}
                  />
                </Flex>

                <Flex h="100%">
                  <Image src={illustration} alt="illustration" />
                </Flex>
              </Flex>
              <Flex
                display-name="right-side"
                flex={1}
                direction="column"
                p={8}
                h="100%"
                justify="start"
                gap="16px"
              >
                <Flex display-name="header-section" direction="column" justify="start" gap="8px">
                  <Heading fontSize="32px" fontWeight="700" color="primary.default">
                    Log in
                  </Heading>
                </Flex>
                <Flex display-name="auth-form">
                  <LoginForm onSuccess={onAuthSuccess} />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
