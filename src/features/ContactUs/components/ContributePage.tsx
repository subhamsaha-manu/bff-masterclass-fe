import Lottie from 'lottie-react'
import React from 'react'

import animationData from '@/assets/lotties/under-construction.json'

export const ContributePage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <Lottie animationData={animationData} {...defaultOptions} />
}
