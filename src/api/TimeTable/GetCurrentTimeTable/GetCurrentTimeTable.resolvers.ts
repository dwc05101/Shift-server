import TimeTable from "../../../entities/TimeTable"
import {
  GetCurrentTimeTableQueryArgs,
  GetCurrentTimeTableResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
  Query: {
    GetCurrentTimeTable: async (
      _,
      args: GetCurrentTimeTableQueryArgs
    ): Promise<GetCurrentTimeTableResponse> => {
      try {
        const { yearMonthWeek, organizationId } = args
        const timetable = await TimeTable.findOne(
          {
            yearMonthWeek,
            organizationId
          },
          { relations: ["slots"] }
        )
        if (timetable) {
          return {
            ok: true,
            error: null,
            timetable
          }
        } else {
          return {
            ok: false,
            error: "Timetable not found",
            timetable: null
          }
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          timetable: null
        }
      }
    }
  }
}

export default resolvers
