import Day from "../../../entities/Day"
import Week from "../../../entities/Week"
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
        const { dayNumber, weekId } = args
        try {
          const week = await Week.findOne({ id: weekId })
          if (week) {
            await Day.create({
              dayNumber,
              week
            }).save()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "Week not found."
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
