import User from "../entities/User"

const validateSlot = async (
  organizationId: number,
  personalCode: string,
  dayId: number,
  startTime: string,
  endTime: string
): Promise<boolean> => {
  try {
    const user = await User.findOne(
      {
        personalCode,
        organizationId
      },
      { relations: ["slots"] }
    )
    if (user) {
      if (user.slots) {
        const currentSlots = user.slots.filter(slot => slot.dayId === dayId)
        let valid = true
        await currentSlots.forEach(slot => {
          if (
            parseInt(slot.startTime, 10) <= parseInt(endTime, 10) ||
            parseInt(slot.endTime, 10) >= parseInt(startTime, 10)
          ) {
            valid = false
          }
        })
        return valid
      } else {
        return true
      }
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

export default validateSlot
