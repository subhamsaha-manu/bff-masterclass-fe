import { Center, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'

type MonthPickerProps = {
  onMonthSelect: () => void
  setFilterState: (state: { [key: string]: string }) => void
}
const MonthPicker: React.FC<MonthPickerProps> = ({ onMonthSelect, setFilterState }) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return (
    <Wrap spacing="10px" align="center" display-name="wrap-div" width="349px">
      {months.map((month, index) => (
        <WrapItem key={month + index}>
          <Center
            w="64px"
            h="70px"
            bg="#90cdf4"
            onClick={() => {
              setFilterState({ birthdayMonth: month })
              onMonthSelect()
            }}
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.1)',
            }}
          >
            {month}
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  )
}

export default MonthPicker
