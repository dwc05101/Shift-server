import Organization from "../../../entities/Organization"
import Slot from "../../../entities/Slot"
import User from "../../../entities/User"
import {
  UpdateSlotMutationArgs,
  UpdateSlotResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"
import cleanNullArgs from "../../../utils/cleanNullArgs"

const resolvers: Resolvers = {
  Mutation: {
    UpdateSlot: authResolver(
      async (
        _,
        args: UpdateSlotMutationArgs,
        { req }
      ): Promise<UpdateSlotResponse> => {
        const user: Organization = req.user
        const slot = await Slot.findOne(
          { id: args.slotId },
          { relations: ["timetable"] }
        )
        const notNullArgs: any = cleanNullArgs(args)
        delete notNullArgs.slotId

        if (slot) {
          if (!slot.timetable.isConfirmed) {
            try {
              if (notNullArgs.userId) {
                const alternateUser = await User.findOne({
                  id: notNullArgs.userId,
                  organizationId: user.id
                })
                if (alternateUser) {
                  slot.user = alternateUser
                  await slot.save()
                  delete notNullArgs.userId
                } else {
                  return {
                    ok: false,
                    error: "Alternate user not found"
                  }
                }
              }
              await Slot.update({ id: args.slotId }, { ...notNullArgs })
              return {
                ok: true,
                error: null
              }
            } catch (err) {
              return {
                ok: false,
                error: err.message
              }
            }
          } else {
            return {
              ok: false,
              error: "Cannot update slots of confirmed timetable"
            }
          }
        } else {
          return {
            ok: false,
            error: "Slot not found"
          }
        }
      }
    )
  }
}

export default resolvers
