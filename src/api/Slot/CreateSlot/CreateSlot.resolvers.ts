import Slot from "../../../entities/Slot"
import TimeTable from "../../../entities/TimeTable"
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
      const {
        startTime,
        endTime,
        day,
        personalCode,
        organizationId,
        timetableId
      } = args
      try {
        const timetable = await TimeTable.findOne(
          { id: timetableId },
          { relations: ["slots"] }
        )
        if (timetable) {
          if (!timetable.isConfirmed) {
            const user = await User.findOne({
              organizationId,
              personalCode
            })
            if (user) {
              await Slot.create({
                startTime,
                endTime,
                timetable,
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
              error: "Cannot create a slot on confirmed timetable"
            }
          }
        } else {
          return {
            ok: false,
            error: "Timetable not found"
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
