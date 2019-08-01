import Day from "../../../entities/Day"
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
          const day = await Day.findOne(
            { id: args.dayId },
            { relations: ["slots", "slots.user"] }
          )
          if (day) {
            return {
              ok: true,
              error: null,
              slots: null
            }
          } else {
            return {
              ok: false,
              error: "Day not found",
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
