import React from 'react'

import { ContributePage } from '../components/ContributePage'

import { LandingLayout } from '@/components/Layout'

export const Contribute: React.FC = () => {
  return (
    <LandingLayout page="contribute">
      <ContributePage />
    </LandingLayout>
  )
}
