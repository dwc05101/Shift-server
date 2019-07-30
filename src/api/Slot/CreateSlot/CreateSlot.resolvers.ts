import Day from "../../../entities/Day"
import Slot from "../../../entities/Slot"
import {
  CreateSlotMutationArgs,
  CreateSlotResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import managerResolver from "../../../utils/managerMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateSlot: managerResolver(
      async (
        _,
        args: CreateSlotMutationArgs,
        { req }
      ): Promise<CreateSlotResponse> => {
        const { startTime, endTime, needs, dayId } = args
        try {
          const day = await Day.findOne({ id: dayId }, { relations: ["slots"] })
          if (day) {
            await Slot.create({
              startTime,
              endTime,
              needs,
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
            error: err.messasge
          }
        }
      }
    )
  }
}

export default resolvers
