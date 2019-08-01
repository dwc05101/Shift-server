import TimeTable from "../../../entities/TimeTable"
import { GetDaysQueryArgs, GetDaysResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetDays: authResolver(
      async (_, args: GetDaysQueryArgs, { req }): Promise<GetDaysResponse> => {
        try {
          const timetable = await TimeTable.findOne(
            { id: args.timetableId },
            { relations: ["days", "days.slots", "days.slots.user"] }
          )
          if (timetable) {
            return {
              ok: true,
              error: null,
              days: timetable.days
            }
          } else {
            return {
              ok: false,
              error: "timetable not found",
              days: null
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            days: null
          }
        }
      }
    )
  }
}

export default resolvers
