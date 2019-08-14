import Day from "../../../entities/Day"
import TimeTable from "../../../entities/TimeTable"
import { CreateDayMutationArgs, CreateDayResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateDay: authResolver(
      async (
        _,
        args: CreateDayMutationArgs,
        { req }
      ): Promise<CreateDayResponse> => {
        const { startTime, endTime, dayNumber, timeTableId } = args
        try {
          const timetable = await TimeTable.findOne({ id: timeTableId })
          if (timetable) {
            await Day.create({
              startTime,
              endTime,
              dayNumber,
              timetable
            }).save()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "Timetable not found"
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
