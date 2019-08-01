import Link from "../../../entities/Link"
import Organization from "../../../entities/Organization"
import TimeTable from "../../../entities/TimeTable"
import {
  CreateLinkMutationArgs,
  CreateLinkResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"
import createShortLink from "../../../utils/createShortLink"

const BASE_URL = "https://dwc05101.github.io/shift/"

const resolvers: Resolvers = {
  Mutation: {
    CreateLink: authResolver(
      async (
        _,
        args: CreateLinkMutationArgs,
        { req }
      ): Promise<CreateLinkResponse> => {
        const user: Organization = req.user
        try {
          const timetable = await TimeTable.findOne({ id: args.timetableId })
          if (timetable) {
            const response: any = await createShortLink(
              BASE_URL + `/application/${user.id}/${timetable.id}`
            )
            const link = await Link.create({
              url: response.url,
              organization: user,
              timetable
            }).save()
            return {
              ok: true,
              error: null,
              link
            }
          } else {
            return {
              ok: false,
              error: "Timetable not found",
              link: null
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            link: null
          }
        }
      }
    )
  }
}

export default resolvers
