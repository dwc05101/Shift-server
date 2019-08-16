import Day from "../../../entities/Day"
import Event from "../../../entities/Event"
import {
  CreateEventMutationArgs,
  CreateEventResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateEvent: authResolver(
      async (
        _,
        args: CreateEventMutationArgs,
        { req }
      ): Promise<CreateEventResponse> => {
        try {
          const day = await Day.findOne({ id: args.dayId })
          if (day) {
            await Event.create({
              ...args
            }).save()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "해당하는 날짜가 없습니다."
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
