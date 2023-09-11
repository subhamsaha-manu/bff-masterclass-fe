import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@chakra-ui/react'
import {
  render as rtlRender,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { defaultMocks } from '../__mocks__/defaultMocks'
import { TeacherDashboard } from '../components/TeacherDashboard'

import { ACTIVITY_ID_1, STUDENT_ID_1 } from '@/utils/constants'
import customTheme from '@/utils/theme'

jest.mock('@/assets/illustrations/activity.svg', () => {
  return 'MockedSVGContent' // You can use any value you want for the mock
})

jest.mock('@/assets/illustrations/auth-modal-illustration.svg', () => {
  return 'MockedSVGContent' // You can use any value you want for the mock
})

type RenderArgsType = {
  mocks?: ReturnType<typeof defaultMocks>
}

const renderTeacherDashboard = async (args?: RenderArgsType) => {
  const { mocks = defaultMocks() } = args || {}

  const returnValue = {
    ...rtlRender(
      <ThemeProvider theme={customTheme}>
        <MockedProvider mocks={Object.values(mocks)} addTypename={false}>
          <TeacherDashboard />
        </MockedProvider>
      </ThemeProvider>
    ),
  }

  await waitForElementToBeRemoved(screen.getByTestId('spinner'))

  return returnValue
}

describe('TeacherDashboard', () => {
  test('should render', async () => {
    await renderTeacherDashboard()

    expect(screen.getByTestId('activities-wrapper')).toBeInTheDocument()
    expect(screen.getAllByTestId('activity-card')).toHaveLength(2)
  })

  test('should call lock unlock activity mutation', async () => {
    const mocks = defaultMocks()
    await renderTeacherDashboard()

    userEvent.click(screen.getByTestId('class-progress-tab'))
    userEvent.click(screen.getByTestId(`activity-${ACTIVITY_ID_1}-${STUDENT_ID_1}`))

    await waitFor(() => {
      expect(mocks.lockUnlockActivityMock.result).toBeCalled()
    })
  })
})
