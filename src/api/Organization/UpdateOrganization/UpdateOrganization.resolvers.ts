import Organization from "../../../entities/Organization"
import {
  UpdateOrganizationMutationArgs,
  UpdateOrganizationResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"
import cleanNullArgs from "../../../utils/cleanNullArgs"

const resolvers: Resolvers = {
  Mutation: {
    UpdateOrganization: authResolver(
      async (
        _,
        args: UpdateOrganizationMutationArgs,
        { req }
      ): Promise<UpdateOrganizationResponse> => {
        const user: Organization = req.user
        const notNullArgs: any = cleanNullArgs(args)

        try {
          if (args.password !== null) {
            user.password = args.password
            await user.save()
            delete notNullArgs.password
          }
          await Organization.update({ id: user.id }, { ...notNullArgs })
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
      }
    )
  }
}

export default resolvers
