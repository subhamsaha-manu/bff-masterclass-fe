import React from 'react'

import { UpdateUserCard } from '../components/UpdateUserCard'

import { ContentLayout } from '@/components/Layout'

export const UpdateUser: React.FC = () => {
  return (
    <ContentLayout page="update-user">
      <UpdateUserCard />
    </ContentLayout>
  )
}
