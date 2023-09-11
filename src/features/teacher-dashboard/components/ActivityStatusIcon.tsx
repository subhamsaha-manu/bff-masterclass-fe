import { FC } from 'react'
import { FaUnlockAlt } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { FcCheckmark } from 'react-icons/fc'

import { ActivityStatus } from '@/types'

type ActivityStatusIconProps = {
  readonly status: ActivityStatus
}
export const ActivityStatusIcon: FC<ActivityStatusIconProps> = ({ status }) => {
  switch (status) {
    case ActivityStatus.Completed:
      return <FcCheckmark />
    case ActivityStatus.Locked:
      return <FaLock />
    case ActivityStatus.Unlocked:
      return <FaUnlockAlt />
    default:
      return null
  }
}
