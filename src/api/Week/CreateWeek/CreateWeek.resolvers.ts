import TimeTable from "../../../entities/TimeTable"
import User from "../../../entities/User"
import Week from "../../../entities/Week"
import {
  CreateWeekMutationArgs,
  CreateWeekResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateWeek: authResolver(
      async (
        _,
        args: CreateWeekMutationArgs,
        { req }
      ): Promise<CreateWeekResponse> => {
        // const user:User = req.user
        const { weekNumber, timetableId } = args
        try {
          const timetable = await TimeTable.findOne({ id: timetableId })
          if (timetable) {
            await Week.create({
              weekNumber,
              timetable
            }).save()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "TimeTable not found"
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
