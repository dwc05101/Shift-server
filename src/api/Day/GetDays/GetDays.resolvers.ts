import Week from "../../../entities/Week"
import { GetDaysQueryArgs, GetDaysResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetDays: authResolver(
      async (_, args: GetDaysQueryArgs, { req }): Promise<GetDaysResponse> => {
        try {
          const week = await Week.findOne(
            { id: args.weekId },
            { relations: ["days"] }
          )
          if (week) {
            return {
              ok: true,
              error: null,
              days: week.days
            }
          } else {
            return {
              ok: false,
              error: "Week not found",
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
