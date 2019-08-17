import { getRepository, In } from "typeorm"
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
      const { slots, personalCode, organizationId, timetableId } = args
      try {
        const timetable = await TimeTable.findOne(
          { id: timetableId },
          { relations: ["days"] }
        )

        const isSelected = args.slots[0].isSelected
        if (timetable) {
          if (!timetable.isConfirmed) {
            const user = await User.findOne({
              organizationId,
              personalCode
            })
            if (user) {
              const dayIds: number[] = []
              await timetable.days.forEach(day => dayIds.push(day.id))

              const existingSlots = await getRepository(Slot).find({
                isSelected,
                userId: user.id,
                dayId: In(dayIds)
              })

              await existingSlots.forEach(slot => {
                slot.remove()
              })

              let success = true
              slots.forEach(async slot => {
                const day = await Day.findOne({
                  dayNumber: slot.dayNumber,
                  timetableId
                })
                if (day) {
                  if (
                    await validateSlot(
                      organizationId,
                      personalCode,
                      day.id,
                      slot.startTime,
                      slot.endTime
                    )
                  ) {
                    await Slot.create({
                      isSelected: slot.isSelected,
                      isFulltime: slot.isFulltime,
                      startTime: slot.startTime,
                      endTime: slot.endTime,
                      isEndTimeNextDay: slot.isEndTimeNextDay,
                      isStartTimeNextDay: slot.isStartTimeNextDay,
                      day,
                      user
                    }).save()
                    return
                  } else {
                    success = false
                    return
                  }
                } else {
                  success = false
                  return
                }
              })
              if (success) {
                return {
                  ok: true,
                  error: null
                }
              } else {
                return {
                  ok: false,
                  error: "이미 지원한 시간대엔 지원이 불가능합니다."
                }
              }
            } else {
              return {
                ok: false,
                error: "존재하지 않는 유저입니다."
              }
            }
          } else {
            return {
              ok: false,
              error: "확정된 시간표는 수정이 불가능 합니다."
            }
          }
        } else {
          return {
            ok: false,
            error: "존재하지 않는 시간표입니다."
          }
        }
      } catch (err) {
        return {
          ok: false,
          error: `서버 내부 오류 : ${err.message}`
        }
      }
    }
  }
}

export default resolvers
