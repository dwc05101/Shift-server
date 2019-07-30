import { getConnection } from "typeorm"
import Invitation from "../../../entities/Invitation"
import Organization from "../../../entities/Organization"
import User from "../../../entities/User"
import {
  AcceptInvitationMutationArgs,
  AcceptInvitationResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    AcceptInvitation: authResolver(
      async (
        _,
        args: AcceptInvitationMutationArgs,
        { req }
      ): Promise<AcceptInvitationResponse> => {
        const user: User = req.user
        try {
          const invitation = await Invitation.findOne({ id: args.invitationId })
          if (invitation) {
            if (invitation.invitedUserId === user.id) {
              const organization = await Organization.findOne({
                id: invitation.invitingOrganizationId
              })
              if (organization) {
                await getConnection()
                  .createQueryBuilder()
                  .relation(Organization, "users")
                  .of(organization)
                  .add(user)

                invitation.accepted = true
                invitation.save()

                return {
                  ok: true,
                  error: null
                }
              } else {
                return {
                  ok: false,
                  error: "Organization not found"
                }
              }
            } else {
              return {
                ok: false,
                error: "Only invited user can accept invitation"
              }
            }
          } else {
            return {
              ok: false,
              error: "Invitation not found"
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
