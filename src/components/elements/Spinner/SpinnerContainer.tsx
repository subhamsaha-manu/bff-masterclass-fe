import { Flex, Spinner } from '@chakra-ui/react'

export type SpinnerProps = {
  size?: string
  thickness?: string
  color?: string
}
export const SpinnerContainer = ({
  size = 'md',
  thickness = '4px',
  color = 'blue.500',
}: SpinnerProps) => {
  return (
    <Flex h="100vh" justify="center" alignItems="center">
      <Spinner
        speed="0.65s"
        emptyColor="gray.200"
        thickness={thickness}
        color={color}
        size={size}
        data-testid="spinner"
      />
    </Flex>
  )
}
