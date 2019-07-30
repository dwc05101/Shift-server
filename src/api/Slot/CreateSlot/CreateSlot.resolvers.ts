import Day from "../../../entities/Day"
import Slot from "../../../entities/Slot"
import User from "../../../entities/User"
import {
  CreateSlotMutationArgs,
  CreateSlotResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateSlot: authResolver(
      async (
        _,
        args: CreateSlotMutationArgs,
        { req }
      ): Promise<CreateSlotResponse> => {
        const user: User = req.user
        const { startTime, endTime, dayId } = args
        try {
          const day = await Day.findOne({ id: dayId }, { relations: ["slots"] })
          if (day) {
            await Slot.create({
              startTime,
              endTime,
              user,
              day
            }).save()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "Day not found"
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
