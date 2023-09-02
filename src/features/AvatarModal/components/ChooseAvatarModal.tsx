import {
  Avatar,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type ChooseAvatarModalProps = {
  isOpen: boolean
  onClose: () => void
  onAvatarClick: (avatar: string) => void
  avatarId: string
  avatars: Array<Avatar>
}

type Avatar = {
  key: string
  img: { default: string }
  default: boolean
}
export const ChooseAvatarModal: React.FC<ChooseAvatarModalProps> = ({
  isOpen,
  onClose,
  onAvatarClick,
  avatarId,
  avatars,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('')
  const onAvatarClickHandler = (avatar: string) => {
    setSelectedAvatar(avatar)
  }
  const onDoneClick = () => {
    onAvatarClick(selectedAvatar)
    onClose()
  }

  useEffect(() => {
    setSelectedAvatar(avatarId)
  }, [avatarId, isOpen])
  const renderAvatars = (avatars: Array<Avatar>) => {
    return (
      <Wrap spacing="10">
        {avatars.map((avatar: Avatar) => (
          <WrapItem
            onClick={() => onAvatarClickHandler(avatar.key)}
            key={avatar.key}
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.1)',
            }}
            opacity={selectedAvatar === avatar.key ? 1 : 0.5}
          >
            <Image
              borderRadius="full"
              boxSize={{ base: '100px', lg: '150px' }}
              src={avatar.img.default}
              border={selectedAvatar === avatar.key ? '6px solid #0bc5ea' : 'none'}
            />
          </WrapItem>
        ))}
      </Wrap>
    )
  }
  const size = useBreakpointValue({ base: 'md', lg: '3xl' })
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose an Avatar for your friend</ModalHeader>
          <ModalCloseButton onClick={() => onAvatarClickHandler('')} />
          <ModalBody>{renderAvatars(avatars)}</ModalBody>
          <ModalFooter>
            <Button bg="cyan.400" mr={3} onClick={onDoneClick} disabled={!selectedAvatar}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
