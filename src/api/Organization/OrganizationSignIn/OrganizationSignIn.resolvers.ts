import Organization from "../../../entities/Organization"
import {
  OrganizationSignInMutationArgs,
  OrganizationSignInResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import createJWT from "../../../utils/createJWT"

const resolvers: Resolvers = {
  Mutation: {
    OrganizationSignIn: async (
      _,
      args: OrganizationSignInMutationArgs
    ): Promise<OrganizationSignInResponse> => {
      try {
        const organization = await Organization.findOne({
          loginId: args.loginId
        })
        if (organization) {
          if (organization.comparePassword(args.password)) {
            return {
              ok: true,
              error: null,
              token: createJWT(organization.id)
            }
          }
          return {
            ok: false,
            error: "Please check your ID / Password",
            token: null
          }
        } else {
          return {
            ok: false,
            error: "Please check your ID / Password",
            token: null
          }
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          token: null
        }
      }
    }
  }
}

export default resolvers
