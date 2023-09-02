import React from 'react'

import { ContactUsCard } from '../components/ContactUsCard'

import { LandingLayout } from '@/components/Layout'

export const ContactUs: React.FC = () => {
  return (
    <LandingLayout page="contact-us">
      <ContactUsCard />
    </LandingLayout>
  )
}
