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
        const { dayNumber, timetableId } = args
        try {
          const timetable = await TimeTable.findOne({ id: timetableId })
          if (timetable) {
            const existingDay = await Day.findOne({
              dayNumber,
              timetableId: timetable.id
            })
            if (!existingDay) {
              await Day.create({
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
                error: "Day already exists"
              }
            }
          } else {
            return {
              ok: false,
              error: "Timetable not found."
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
