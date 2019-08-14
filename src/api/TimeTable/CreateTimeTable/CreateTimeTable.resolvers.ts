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
        const { yearMonthWeek, startTime, endTime } = args
        try {
          const existingTimetable = await TimeTable.findOne({
            yearMonthWeek,
            organizationId: user.id
          })
          if (!existingTimetable) {
            await TimeTable.create({
              yearMonthWeek,
              startTime,
              endTime,
              organization: user
            }).save()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "Timetable already exists"
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message
          }
        }
      }
    )
  }
}

export default resolvers
