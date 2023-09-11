import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { startCase } from 'lodash'
import { FC } from 'react'

import { ActivityStatusIcon } from './ActivityStatusIcon'

import { useLockUnlockActivityMutation } from '../apis/lockUnlockActivity.generated'
import { teacherDashboard } from '../apis/teacherDashboard'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { Activity, ActivityStatus, Student } from '@/types'
import { CLASS_ID } from '@/utils/constants'

type ClassProgressProps = {
  readonly students: Array<Student>
  readonly activities: Array<Activity>
}
export const ClassProgress: FC<ClassProgressProps> = ({ students, activities }) => {
  const activityIds = activities.map((activity) => activity.uuid)

  const [lockUnlockActivity, { loading }] = useLockUnlockActivityMutation({
    refetchQueries: [{ query: teacherDashboard, variables: { classId: CLASS_ID } }],
    awaitRefetchQueries: true,
  })

  const updatedStudentData: Array<Student> = students.map((student) => {
    const studentActivities = activityIds.map((activityId) => {
      return {
        uuid: activityId,
        status:
          student.activities.find((activity) => activity.uuid === activityId)?.status ??
          ActivityStatus.Unlocked,
      }
    })

    return {
      ...student,
      activities: studentActivities,
    }
  })

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th fontSize="md">Sl No.</Th>
            <Th fontSize="md">Name</Th>
            {activities.map((activity) => (
              <Th fontSize="md" key={activity.uuid} textTransform="capitalize">
                {startCase(activity.name)}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {updatedStudentData.map(({ uuid, name, activities }, index) => (
            <Tr key={uuid}>
              <Td>{index + 1}</Td>
              <Td>{name}</Td>
              {activities.map((activity) => (
                <Td
                  data-testid={`activity-${activity.uuid}-${uuid}`}
                  key={activity.uuid}
                  cursor={activity.status === ActivityStatus.Completed ? 'default' : 'pointer'}
                  onClick={() => {
                    lockUnlockActivity({
                      variables: {
                        lockUnlockActivityInput: {
                          activityId: activity.uuid,
                          studentId: uuid,
                          status:
                            activity.status === ActivityStatus.Locked
                              ? ActivityStatus.Unlocked
                              : ActivityStatus.Locked,
                        },
                      },
                    })
                  }}
                >
                  {loading ? <SpinnerContainer /> : <ActivityStatusIcon status={activity.status} />}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
