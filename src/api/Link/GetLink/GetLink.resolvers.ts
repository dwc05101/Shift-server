import Link from "../../../entities/Link"
import { GetLinkQueryArgs, GetLinkResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
  Query: {
    GetLink: async (_, args: GetLinkQueryArgs): Promise<GetLinkResponse> => {
      try {
        const { organizationId, timetableId } = args
        const link = await Link.findOne(
          { organizationId, timetableId },
          {
            relations: [
              "timetable",
              "timetable.slots",
              "organization",
              "organization.users"
            ]
          }
        )
        if (link) {
          return {
            ok: true,
            error: null,
            link
          }
        } else {
          return {
            ok: false,
            error: "link not found",
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
  }
}

export default resolvers
