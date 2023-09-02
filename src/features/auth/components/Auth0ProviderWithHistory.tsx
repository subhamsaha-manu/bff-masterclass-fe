import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'

type Auth0ProviderWithHistoryProps = {
  children: React.ReactNode
}

export const Auth0ProviderWithHistory = ({ children }: Auth0ProviderWithHistoryProps) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN!
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!

  const url = window.location.origin + '/app'

  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={url}>
      {children}
    </Auth0Provider>
  )
}
