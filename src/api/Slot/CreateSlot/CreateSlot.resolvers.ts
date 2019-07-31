import Day from "../../../entities/Day"
import Slot from "../../../entities/Slot"
import User from "../../../entities/User"
import {
  CreateSlotMutationArgs,
  CreateSlotResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
  Mutation: {
    CreateSlot: async (
      _,
      args: CreateSlotMutationArgs,
      { req }
    ): Promise<CreateSlotResponse> => {
      const { startTime, endTime, dayId, personalCode, organizationId } = args
      try {
        const day = await Day.findOne({ id: dayId }, { relations: ["slots"] })
        if (day) {
          const user = await User.findOne({
            organizationId,
            personalCode
          })
          if (user) {
            await Slot.create({
              startTime,
              endTime,
              day,
              user
            }).save()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "user not found"
            }
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
  }
}

export default resolvers
