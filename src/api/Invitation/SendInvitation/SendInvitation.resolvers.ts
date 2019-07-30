import Invitation from "../../../entities/Invitation"
import Organization from "../../../entities/Organization"
import User from "../../../entities/User"
import {
  SendInvitationMutationArgs,
  SendInvitationResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    SendInvitation: authResolver(
      async (
        _,
        args: SendInvitationMutationArgs,
        { req }
      ): Promise<SendInvitationResponse> => {
        const user: User = req.user
        try {
          const invitingOrganization = await Organization.findOne(
            { id: args.invitingOrganizationId },
            { relations: ["admin"] }
          )
          const invitedUser = await User.findOne({ id: args.invitedUserId })
          if (invitingOrganization && invitedUser) {
            if (invitingOrganization.admin.id === user.id) {
              await Invitation.create({
                invitingOrganization,
                invitedUser,
                accepted: false
              })
              return {
                ok: true,
                error: null
              }
            } else {
              return {
                ok: false,
                error: "Only admin can send invitation"
              }
            }
          } else {
            return {
              ok: false,
              error: "Organization / User not found"
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
