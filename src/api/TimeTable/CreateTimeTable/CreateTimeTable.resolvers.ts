import Day from "../../../entities/Day"
import Organization from "../../../entities/Organization"
import TimeTable from "../../../entities/TimeTable"
import {
  CreateTimeTableMutationArgs,
  CreateTimeTableResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateTimeTable: authResolver(
      async (
        _,
        args: CreateTimeTableMutationArgs,
        { req }
      ): Promise<CreateTimeTableResponse> => {
        const user: Organization = req.user
        const { yearMonthWeek, days } = args
        try {
          const existingTimetable = await TimeTable.findOne({
            yearMonthWeek,
            organizationId: user.id
          })
          if (!existingTimetable) {
            const timetable = await TimeTable.create({
              yearMonthWeek,
              organization: user
            }).save()
            for (const day of days) {
              await Day.create({
                dayNumber: day.dayNumber,
                startTime: day.startTime,
                endTime: day.endTime,
                isEndTimeNextDay: day.isEndTimeNextDay,
                timetable
              }).save()
            }
            return {
              ok: true,
              error: null,
              timetableId: timetable.id
            }
          } else {
            return {
              ok: false,
              error: "Timetable already exists",
              timetableId: null
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            timetableId: null
          }
        }
      }
    )
  }
}

export default resolvers
