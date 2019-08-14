import Day from "../../../entities/Day"
import Slot from "../../../entities/Slot"
import TimeTable from "../../../entities/TimeTable"
import User from "../../../entities/User"
import {
  CreateSlotMutationArgs,
  CreateSlotResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import validateSlot from "../../../utils/validateSlot"

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
        dayNumber,
        personalCode,
        organizationId,
        timetableId
      } = args
      try {
        const timetable = await TimeTable.findOne(
          { id: timetableId },
          { relations: ["days"] }
        )
        if (timetable) {
          if (!timetable.isConfirmed) {
            const user = await User.findOne({
              organizationId,
              personalCode
            })
            if (user) {
              const day = await Day.findOne({ dayNumber, timetableId })
              if (day) {
                if (
                  await validateSlot(
                    organizationId,
                    personalCode,
                    day.id,
                    startTime,
                    endTime
                  )
                ) {
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
                    error: "Not valid slot"
                  }
                }
              } else {
                return {
                  ok: false,
                  error: "day not found"
                }
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
