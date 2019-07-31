import Slot from "../../../entities/Slot"
import {
  RemoveSlotMutationArgs,
  RemoveSlotResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
  Mutation: {
    RemoveSlot: async (
      _,
      args: RemoveSlotMutationArgs
    ): Promise<RemoveSlotResponse> => {
      try {
        const slot = await Slot.findOne({ id: args.slotId })
        if (slot) {
          slot.remove()
          return {
            ok: true,
            error: null
          }
        } else {
          return {
            ok: false,
            error: "Slot not found"
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
