import { MockedProvider } from '@apollo/client/testing'
import { act, fireEvent, render as rtlRender, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { LoginForm } from '../LoginForm'
import { LOGIN_USER } from '../queries'
import { LoginQuery, LoginQueryVariables } from '../queries.generated'

import { createMock } from '@/mocks/createMock'
import { createDefaultProps } from '@/utils/test/buildProps'

describe('Login Form', () => {
  test.skip('should render Login Form', () => {
    renderLoginPage()
    expect(screen.getByTestId('login-heading')).toBeInTheDocument()
  })

  describe('Invalid inputs', () => {
    test('should throw error when no email is provided', async () => {
      renderLoginPage()
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

      await waitFor(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50))
      })
      expect(screen.getByTestId('login-email-error-message')).toBeInTheDocument()
    })
  })

  test('should throw error when trying to login with incorrect email', async () => {
    const mocks = defaultMocks()
    mocks.loginUser.newData.mockImplementation(() => ({
      data: {
        login: {
          name: null,
          token: '',
          message: 'Invalid email or password',
        },
      },
    }))

    renderLoginPage(mocks)

    await screen.findByTestId('login-form')
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.input(emailInput, {
      target: {
        value: 'test@example.com',
      },
    })
    fireEvent.input(passwordInput, {
      target: {
        value: 'test',
      },
    })

    await act(async () => {
      fireEvent.submit(submitButton)
    })
    expect(
      await screen.findByText("Seems like we don't have you in our database")
    ).toBeInTheDocument()
  })
})

const renderLoginPage = (mocks = defaultMocks(), props = defaultProps()) => {
  return rtlRender(
    <MockedProvider mocks={Object.values(mocks)} addTypename={false}>
      <MemoryRouter>
        <LoginForm {...props} />
      </MemoryRouter>
    </MockedProvider>
  )
}

const defaultProps = createDefaultProps({
  onSuccess: jest.fn(),
})

const defaultMocks = () => ({
  loginUser: createMock<LoginQueryVariables, LoginQuery>(
    LOGIN_USER,
    {
      input: {
        email: 'test@example.com',
        password: 'test',
      },
    },
    {
      login: {
        name: 'Test User',
        token: '1234abcd',
        message: 'Login successful',
      },
    }
  ),
})
