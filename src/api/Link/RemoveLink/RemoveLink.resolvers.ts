import Link from "../../../entities/Link"
import Organization from "../../../entities/Organization"
import {
  RemoveLinkMutationArgs,
  RemoveLinkResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    RemoveLink: authResolver(
      async (
        _,
        args: RemoveLinkMutationArgs,
        { req }
      ): Promise<RemoveLinkResponse> => {
        const user: Organization = req.user
        try {
          const link = await Link.findOne({
            id: args.linkId,
            organizationId: user.id
          })
          if (link) {
            link.remove()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "Link not found"
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message
          }
        }
      }
    )
  }
}

export default resolvers
