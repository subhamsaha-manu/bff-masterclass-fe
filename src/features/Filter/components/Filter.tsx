import {
  Button,
  Flex,
  FormControl,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

import MonthPicker from '@/components/elements/MonthPicker/MonthPicker'

type FilterProps = {
  setFilterState: (state: { [key: string]: string }) => void
  filterState: { [key: string]: string }
}
export const Filter: React.FC<FilterProps> = ({ setFilterState, filterState }) => {
  const { onClose, isOpen, onToggle } = useDisclosure()

  const onSubmit = () => {
    console.log(filterState)
  }
  const onReset = () => {
    setFilterState({
      profileName: '',
      birthdayMonth: '',
    })
  }
  return (
    <Flex display-name="filter-container-div" w="95%" align="center" justify="center">
      <VStack spacing={3} mt={2} mb={2} display-name="filter-vstack-div">
        <FormControl id="filterString">
          <Input
            placeholder="Search by name"
            _placeholder={{ color: 'white' }}
            type="text"
            value={filterState['profileName']}
            onChange={(e) =>
              setFilterState({
                profileName: e.target.value,
              })
            }
          />
        </FormControl>

        <Popover isOpen={isOpen} onClose={onClose}>
          <PopoverTrigger>
            <Input
              placeholder="Search by Birthday month"
              _placeholder={{ color: 'white' }}
              value={filterState['birthdayMonth']}
              onClick={onToggle}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader color="black">Select Month!</PopoverHeader>
            <PopoverBody>
              <MonthPicker onMonthSelect={onToggle} setFilterState={setFilterState} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Stack
          spacing={6}
          direction={['column', 'row']}
          display-name="button-div"
          w="100%"
          mt="30px !important"
        >
          <Button
            bg="red.400"
            color="white"
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={onReset}
          >
            Reset
          </Button>
          <Button
            color="white"
            w="full"
            _hover={{
              bg: 'cyan.400',
            }}
            colorScheme="teal"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Stack>
      </VStack>
    </Flex>
  )
}
