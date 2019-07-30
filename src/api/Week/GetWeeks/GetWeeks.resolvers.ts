import TimeTable from "../../../entities/TimeTable"
import { GetWeeksQueryArgs, GetWeeksResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetWeeks: authResolver(
      async (
        _,
        args: GetWeeksQueryArgs,
        { req }
      ): Promise<GetWeeksResponse> => {
        try {
          const timetable = await TimeTable.findOne(
            { id: args.timetableId },
            { relations: ["weeks"] }
          )
          if (timetable) {
            return {
              ok: true,
              error: null,
              weeks: timetable.weeks
            }
          } else {
            return {
              ok: false,
              error: "Timetable not found",
              weeks: null
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            weeks: null
          }
        }
      }
    )
  }
}

export default resolvers
