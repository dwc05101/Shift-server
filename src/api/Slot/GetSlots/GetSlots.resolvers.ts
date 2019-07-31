import TimeTable from "../../../entities/TimeTable"
import { GetSlotsQueryArgs, GetSlotsResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetSlots: authResolver(
      async (
        _,
        args: GetSlotsQueryArgs,
        { req }
      ): Promise<GetSlotsResponse> => {
        try {
          const timetable = await TimeTable.findOne(
            { id: args.timetableId },
            { relations: ["slots"] }
          )
          if (timetable) {
            return {
              ok: true,
              error: null,
              slots: timetable.slots
            }
          } else {
            return {
              ok: false,
              error: "TimeTable not found",
              slots: null
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            slots: null
          }
        }
      }
    )
  }
}

export default resolvers
