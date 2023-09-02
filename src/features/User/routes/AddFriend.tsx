import React from 'react'

import { AddProfileCard } from '../components/AddProfileCard'

import { ContentLayout } from '@/components/Layout'

export const AddFriend: React.FC = () => {
  return (
    <ContentLayout page="add friends">
      <AddProfileCard />
    </ContentLayout>
  )
}
